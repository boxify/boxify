/** @jsx React.DOM */

var RouteEditor = require('./route-editor.jsx')
  , utils = require('./utils')

var RouteAdder = module.exports = React.createClass({
  displayName: 'RouteAdder',
  getDefaultProps: function () {
    return {
      onAdd: function (route) {console.log('creating', route)},
      onAddNew: function (route, name) {console.log('new box', route, name)},
      boxNames: [],
      exclude: [],
      routesTaken: []
    }
  },
  getInitialState: function () {
    return {
      name: '',
      value: this.props.boxNames[0],
      newName: null
    }
  },
  onAdd: function () {
    if (!utils.isGoodRoute(this.state.name, this.props.routesTaken)) {
      return
    }
    if (this.state.value === '[new]') {
      return this.props.onAddNew(this.state.name, this.state.newName)
    }
    this.props.onAdd({name: this.state.name, value: this.state.value})
  },
  onChange: function (route) {
    this.setState(route)
  },
  onChangeNew: function (name, title) {
    this.setState({
      name: name,
      value: '[new]',
      newName: title
    })
  },
  render: function () {
    var enabled = utils.isGoodRoute(this.state.name, this.props.routesTaken)
      , boxNames = this.props.boxNames
    if (this.state.value === '[new]') {
      boxNames = boxNames.concat([{id: '[new]', name: this.state.newName}])
    }
    return (
      <div className='route-adder'>
        <RouteEditor initialValue={{name: this.state.name, value: this.state.value}}
          routesTaken={this.props.routesTaken}
          boxNames={boxNames}
          exclude={this.props.exclude}
          allChanges={true}
          onChangeNew={this.onChangeNew}
          onChange={this.onChange}/>
        <button className='route-adder_new' onClick={this.onAdd} disabled={!enabled}>Create</button>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:
