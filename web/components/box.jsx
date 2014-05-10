/** @jsx React.DOM */

var AddBox = require('./add-box.jsx')
  , EditButton = require('./edit-button.jsx')
  
  , d = React.DOM

var Box = module.exports = React.createClass({
  displayName: 'Box',
  getDefaultProps: function () {
    return {
      name: '',
      boxes: {},
      parent: null,
      onChangeBox: function (name, update) {console.log('want to change something', name, update)},
      onChangeInst: function (parent, i, update) {console.log('want to change inst', parent, i, update)},
      changeBox: function (update) {console.log('changeit', update)},
      changeInst: function (update) {console.log('changeit inst', update)},
      trail: []
    }
  },
  onAdd: function (name, isNew) {
    if (isNew) {
      var update = {}
      update[name] = {$set: {name: name}}
      this.props.onChange(name, update)
    }
    var child
    if (name === '<outlet>') {
      child = {type: 'outlet'}
    } else {
      child = {type: 'box', box: name}
    }
    this.props.onChange(name, {children: {$push: child}})
  },
  getBox: function () {
    return this.props.boxes[this.props.name]
  },
  onChangeRoutes: function (routes) {
    this.props.changeInst({routes: {$set: routes}})
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
    return (
      <div className='box' style={style}>
        <EditButton
          onChangeInst={this.props.changeInst} 
          onChangeBox={this.props.changeBox}
          isRoot={!this.props.parent}
          inst={this.props.inst}
          box={box}/>
        {box.children && d.div({className: 'box_name'}, name)}
        {
          box.children && box.children.map(function (child, i) {
            if (child.type === 'outlet') {
              return <Outlet key={i}
                        boxes={this.props.boxes}
                        onChangeInst={this.props.onChangeInst}
                        onChangeBox={this.props.onChangeBox}
                        onChangeRoutes={this.onChangeRoutes}
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
        {!box.children && d.div({className: 'box_filler'}, name)}
        <AddBox canAddOutlet={!!box.routes} boxNames={addNames} allNames={Object.keys(this.props.boxes)} onAdd={this.onAdd}/>
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
  return style
}

