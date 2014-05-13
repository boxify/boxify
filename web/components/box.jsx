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
      name: '',
      boxes: {},
      inst: null,
      parent: null,
      onChangeBox: function (name, update) {console.log('want to change something', name, update)},
      onChangeInst: function (parent, i, update) {console.log('want to change inst', parent, i, update)},
      changeBox: function (update) {console.log('changeit', update)},
      changeInst: function (update) {console.log('changeit inst', update)},
      trail: []
    }
  },
  getInitialState: function () {
    return {editing: false}
  },
  onAdd: function (name, isNew) {
    if (isNew) {
      return this.props.onChangeBox(name, 'new', this.onAdd.bind(null, name, false))
    }
    var child
    if (name === '<outlet>') {
      child = {type: 'outlet'}
    } else {
      child = {type: 'box', box: name}
    }
    if (!this.props.boxes[this.props.name].children) {
      return this.props.onChangeBox(this.props.name, {children: {$set: [child]}})
    }
    this.props.onChangeBox(this.props.name, {children: {$push: [child]}})
  },
  getBox: function () {
    return this.props.boxes[this.props.name]
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
    var name = d.span({className: 'box_name'}, this.props.name)
      , childless = !this.props.boxes[this.props.name].children
    return (
      <div className={'box_controls' + (childless ? ' box_controls--childless' : '')}>
        {childless && name}
        <div className='box_controls_buttons'>
          {this.props.changeInst && d.button({className: 'box_control box_remove', onClick: this.onRemove})}
          {
            actions.map(function (action) {
              return <button className={'box_control box_control-' + action[0]} onClick={action[1]}/>
            })
          }
        </div>
        {!childless && name}
      </div>
    )
  },
  onNewBox: function (name, done) {
    this.props.onChangeBox(name, 'new', done)
  },
  editor: function () {
    if (!this.state.editing) return
    return (
      <div className='edit-button_editor'>
        <div className='edit-button_back' onClick={this.onCloseEdit}/>
        <BoxEditor
          onChangeInst={this.props.changeInst}
          onChangeBox={this.props.changeBox}
          onNewBox={this.onNewBox}
          trail={this.props.trail.concat([this.props.name])}
          boxNames={Object.keys(this.props.boxes)}
          isRoot={!this.props.parent}
          inst={this.props.inst}
          box={this.props.boxes[this.props.name]}/>
      </div>
    )
  },
  render: function () {
    var name = this.props.name
    if (this.props.trail.indexOf(name) !== -1) {
      // TODO handle this better. fix the problem, don't just complain
      return <div className='box'>Recursion!!!!</div>
    }
    var trail = this.props.trail.concat([name])
      , style = {}
      , box = this.props.boxes[name]
    if (!box) {
      console.error('Unknown box...', name)
      return <div className='box'>Unknown Box {name}</div>
    }
    var addNames = Object.keys(this.props.boxes).filter(function (name) {
      return trail.indexOf(name) === -1
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
                        changeInst={this.props.onChangeInst.bind(null, this.props.name, i)}
                        trail={trail}
                        routes={box.routes}/>
            }
            return <Box key={i}
                      inst={child}
                      parent={this.props.name}
                      boxes={this.props.boxes}
                      changeBox={this.props.onChangeBox.bind(null, child.box)}
                      changeInst={this.props.onChangeInst.bind(null, this.props.name, i)}

                      onChangeInst={this.props.onChangeInst}
                      onChangeBox={this.props.onChangeBox}
                      name={child.box}
                      trail={trail}/>
          }.bind(this))
        }
        <AddBox canAddOutlet={true} boxNames={addNames} allNames={Object.keys(this.props.boxes)} onAdd={this.onAdd}/>
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

