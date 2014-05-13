/** @jsx React.DOM */

var AddBox = require('./add-box.jsx')
  , EditButton = require('./edit-button.jsx')
  , BoxEditor = require('./box-editor.jsx')
  , _ = require('lodash')
  
  , d = React.DOM

var Box = module.exports = React.createClass({
  displayName: 'Box',
  getDefaultProps: function () {
    return {
      id: '',
      boxes: {},
      inst: null,
      parent: null,
      onNewBox: function (name, done) {console.log('new box!', name); done(Math.random())},
      onChangeBox: function (id, update) {console.log('want to change something', id, update)},
      onChangeInst: function (pid, i, update) {console.log('want to change inst', pid, i, update)},
      changeBox: function (update) {console.log('changeit', update)},
      changeInst: function (update) {console.log('changeit inst', update)},
      trail: []
    }
  },
  getInitialState: function () {
    return {editing: false}
  },
  onAddNew: function (name) {
    this.props.onNewBox(name, function (id) {
      this.onAdd(id)
    }.bind(this))
  },
  onAdd: function (id) {
    var child
    if (id === '<outlet>') {
      child = {type: 'outlet'}
    } else {
      child = {type: 'box', box: id}
    }
    if (!this.props.boxes[this.props.id].children) {
      return this.props.onChangeBox(this.props.id, {children: {$set: [child]}})
    }
    this.props.onChangeBox(this.props.id, {children: {$push: [child]}})
  },
  getBox: function () {
    return this.props.boxes[this.props.id]
  },
  onChangeRoutes: function (routes) {
    this.props.changeInst({routes: {$set: routes}})
  },
  onRemove: function () {
    this.props.changeInst('delete')
  },
  onEdit: function () {
    this.setState({editing: true})
  },
  onCloseEdit: function () {
    this.setState({editing: false})
  },
  onToggleExpand: function () {
    var style = _.clone(this.getBox().style) || {}
    style.expand = style.expand === undefined ? false : !style.expand
    this.props.changeBox({style: {$set: style}})
  },
  onToggleOrientation: function () {
    var style = _.clone(this.getBox().style) || {}
    style.flex = style.flex === 'vertical' ? 'horizontal' : 'vertical'
    this.props.changeBox({style: {$set: style}})
  },
  controls: function () {
    var actions = [
      ['expand', this.onToggleExpand],
      ['orientation', this.onToggleOrientation],
      ['edit', this.onEdit]
    ]
    var name = this.props.boxes[this.props.id].name
    var nameBox = d.span({className: 'box_name'}, name)
      , childless = !this.props.boxes[this.props.id].children
    return (
      <div className={'box_controls' + (childless ? ' box_controls--childless' : '')}>
        {childless && nameBox}
        <div className='box_controls_buttons'>
          {this.props.changeInst && d.button({className: 'box_control box_remove', onClick: this.onRemove})}
          {
            actions.map(function (action) {
              return <button className={'box_control box_control-' + action[0]} onClick={action[1]}/>
            })
          }
        </div>
        {!childless && nameBox}
      </div>
    )
  },
  editor: function () {
    if (!this.state.editing) return
    var boxes = this.props.boxes
    var boxNames = Object.keys(boxes).map(function (id) {
      return {id: id, name: boxes[id].name}
    })
    return (
      <div className='edit-button_editor'>
        <div className='edit-button_back' onClick={this.onCloseEdit}/>
        <BoxEditor
          onChangeInst={this.props.changeInst}
          onChangeBox={this.props.changeBox}
          onNewBox={this.props.onNewBox}
          trail={this.props.trail.concat([this.props.id])}
          boxNames={boxNames}
          isRoot={!this.props.parent}
          inst={this.props.inst}
          box={this.props.boxes[this.props.id]}/>
      </div>
    )
  },
  render: function () {
    var id = this.props.id
    if (this.props.trail.indexOf(id) !== -1) {
      // TODO handle this better. fix the problem, don't just complain
      return <div className='box'>Recursion!!!!</div>
    }
    var trail = this.props.trail.concat([id])
      , style = {}
      , box = this.props.boxes[id]
    if (!box) {
      console.error('Unknown box...', id)
      return <div className='box'>Unknown Box {id}</div>
    }
    var boxes = this.props.boxes
    var allNames = Object.keys(this.props.boxes).map(function (id) {
      return {id: id, name: boxes[id].name}
    })
    if (box.style) {
      style = makeBoxStyle(box.style)
    }
    var cls = 'box'
    if (!box.children || !box.children.length) {
      cls += ' box--childless'
    }
    return (
      <div className={cls} style={style}>
        {this.controls()}
        {
          box.children && box.children.map(function (child, i) {
            if (child.type === 'outlet') {
              return <Outlet key={i}
                        boxes={this.props.boxes}
                        onChangeInst={this.props.onChangeInst}
                        onChangeBox={this.props.onChangeBox}
                        onChangeRoutes={this.onChangeRoutes}
                        onEditRoutes={this.onEdit}
                        changeInst={this.props.onChangeInst.bind(null, this.props.id, i)}
                        trail={trail}
                        routes={box.routes}/>
            }
            return <Box key={i}
                      inst={child}
                      parent={this.props.id}
                      boxes={this.props.boxes}
                      changeBox={this.props.onChangeBox.bind(null, child.box)}
                      changeInst={this.props.onChangeInst.bind(null, this.props.id, i)}

                      onNewBox={this.props.onNewBox}
                      onChangeInst={this.props.onChangeInst}
                      onChangeBox={this.props.onChangeBox}
                      id={child.box}
                      trail={trail}/>
          }.bind(this))
        }
        <AddBox canAddOutlet={true} boxNames={allNames} exclude={trail} onAdd={this.onAdd} onAddNew={this.onAddNew}/>
        {this.editor()}
      </div>
    )
  }
})
var Outlet = require('./outlet.jsx')

function makeBoxStyle(boxs) {
  var style = {}
  if (boxs.flex) {
    style.flexDirection = {'horizontal': 'row', 'vertical': 'column', 'none': undefined}[boxs.flex]
  }
  if (boxs.expand === false) {
    style.flex = 0
  }
  if (boxs.width !== undefined) {
    style.minWidth = boxs.width
  }
  if (boxs.height !== undefined) {
    style.minHeight = boxs.height
  }
  return style
}

