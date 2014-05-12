/** @jsx React.DOM */

var RouteEditor = require('./route-editor.jsx')
  , utils = require('./utils')

var RouteAdder = module.exports = React.createClass({
  displayName: 'RouteAdder',
  getDefaultProps: function () {
    return {
      onAdd: function (route) {console.log('creating', route)},
      boxNames: [],
      allNames: [],
      routesTaken: []
    }
  },
  getInitialState: function () {
    return {
      name: '',
      value: this.props.boxNames[0]
    }
  },
  onAdd: function () {
    if (!utils.isGoodRoute(this.state.name, this.props.routesTaken)) {
      return
    }
    this.props.onAdd({name: this.state.name, value: this.state.value})
  },
  onChange: function (route) {
    this.setState(route)
  },
  render: function () {
    var enabled = utils.isGoodRoute(this.state.name, this.props.routesTaken)
    return (
      <div className='route-adder'>
        <RouteEditor initialValue={{name: this.state.name, value: this.state.value}}
          routesTaken={this.props.routesTaken}
          boxNames={this.props.boxNames}
          allNames={this.props.allNames}
          onChange={this.onChange}/>
        <button className='route-adder_new' onClick={this.onAdd} disabled={!enabled}>Create</button>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:
