/** @jsx React.DOM */

var RouteEditor = require('./route-editor.jsx')
  , utils = require('./utils')

var RouteAdder = module.exports = React.createClass({
  displayName: 'RouteAdder',
  getDefaultProps: function () {
    return {
      onAdd: function (name, value) {console.log('creating', name, value)},
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
    this.props.onAdd(this.state.name, this.state.value)
  },
  onChange: function (name, value) {
    this.setState({name: name, value: value})
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

