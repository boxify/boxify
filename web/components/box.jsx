/** @jsx React.DOM */

var AddBox = require('./add-box.jsx')
  , EditButton = require('./edit-button.jsx')

var Box = module.exports = React.createClass({
  displayName: 'Box',
  getDefaultProps: function () {
    return {
      name: '',
      boxes: {},
      parent: null,
      onChange: function () {console.log('want to change something')},
      trail: []
    }
  },
  onAdd: function (name, isNew) {
    this.props.man.addChild(name, this.props.name)
  },
  getBox: function () {
    return this.props.boxes[this.props.name]
  },
  onChangeRoutes: function (routes) {
    this.props.changeInst({routes: {$set: routes}})
  },
  render: function () {
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
    return (
      <div className='box' style={style}>
        <EditButton
          onChangeInst={this.props.changeInst} 
          onChangeBox={this.props.changeBox}
          inst={this.props.inst}
          box={box}/>
        <div className='box_name'>{name}</div>
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
                      parent={this.props.name}
                      inst={child}
                      boxes={this.props.boxes}
                      changeBox={this.props.onChangeBox.bind(null, child.box)}
                      changeInst={this.props.onChangeInst.bind(null, this.props.name, i)}

                      onChangeInst={this.props.onChangeInst}
                      onChangeBox={this.props.onChangeBox}
                      name={child.box}
                      trail={trail}/>
          }.bind(this))
        }
        <AddBox boxNames={addNames} allNames={Object.keys(this.props.boxes)} onAdd={this.onAdd}/>
        <div className='box_add'>
      </div>
    )
  }
})

var Outlet = require('./outlet')

// vim: set tabstop=2 shiftwidth=2 expandtab:

