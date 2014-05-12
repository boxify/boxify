/** @jsx React.DOM */

var RouteEditor = require('./route-editor.jsx')
  , RouteAdder = require('./route-adder.jsx')

var RoutesEditor = module.exports = React.createClass({
  displayName: 'RoutesEditor',
  getDefaultProps: function () {
    return {
      boxNames: [],
      allNames: [],
      routes: {},
      onChange: function (orig, value) {console.log('changing', orig, name, value)},
      onAdd: function (route) {console.log('adding', route)}
    }
  },
  render: function () {
    var routeNames = Object.keys(this.props.routes)
    return (
      <div className='routes-editor'>
        {
          routeNames.map(function (route) {
            var routesTaken = routeNames.slice()
            routesTaken.splice(routesTaken.indexOf(route), 1)
            return (
              <RouteEditor
                boxNames={this.props.boxNames}
                routesTaken={routesTaken}
                allNames={this.props.allNames}
                initialValue={{name: route, value: this.props.routes[route]}}
                onChange={this.props.onChange.bind(null, route)}/>
            )
          }.bind(this))
        }
        <RouteAdder
          boxNames={this.props.boxNames}
          allNames={this.props.allNames}
          routesTaken={routeNames}
          onAdd={this.props.addRoute}/>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

