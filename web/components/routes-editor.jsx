/** @jsx React.DOM */

var RouteEditor = require('./route-editor.jsx')
  , RouteAdder = require('./route-adder.jsx')

var RoutesEditor = module.exports = React.createClass({
  displayName: 'RoutesEditor',
  getDefaultProps: function () {
    return {
      boxNames: [],
      exclude: [],
      routes: {},
      onChange: function (orig, value) {console.log('changing', orig, value)},
      onChangeNew: function (orig, route, name) {console.log('change new', orig, route, name)},
      onRemove: function (route) {console.log('removing', route)},
      onAdd: function (route) {console.log('adding', route)},
      onAddNew: function (route, name) {console.log('adding new', route, name)}
    }
  },
  render: function () {
    var routeNames = Object.keys(this.props.routes)
    routeNames.sort()
    return (
      <div className='routes-editor'>
        <ul className='routes-editor_list'>
          {
            routeNames.map(function (route) {
              var routesTaken = routeNames.slice()
              routesTaken.splice(routesTaken.indexOf(route), 1)
              return (
                <li className='routes-editor_item'>
                  <RouteEditor
                    boxNames={this.props.boxNames}
                    routesTaken={routesTaken}
                    exclude={this.props.exclude}
                    initialValue={{name: route, value: this.props.routes[route]}}
                    onChangeNew={this.props.onChangeNew.bind(null, route)}
                    onChange={this.props.onChange.bind(null, route)}/>
                  <button className='routes-editor_remove'
                    onClick={this.props.onRemove.bind(null, route)}/>
                </li>
              )
            }.bind(this))
          }
        </ul>
        <RouteAdder
          boxNames={this.props.boxNames}
          exclude={this.props.exclude}
          routesTaken={routeNames}
          onAddNew={this.props.onAddNew}
          onAdd={this.props.onAdd}/>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

