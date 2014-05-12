/** @jsx React.DOM */

var Outlet = module.exports = React.createClass({
  displayName: 'Outlet',
  getDefaultProps: function () {
    return {
      boxes: {},
      onChangeBox: function (name, update) {console.log('changing box', name, update)},
      onEditRoutes: function () {console.log('want to edit routes')},
      onChangeInst: function (parent, i, update) {
        console.log('changing inst', parent, i, update)
      },
    }
  },
  getInitialState: function () {
    return {
      route: this.defaultRoute(this.props)
    }
  },
  componentWillReceiveProps: function (props) {
    if (props.routes === this.props.routes) return
    this.setState({
      route: this.defaultRoute(this.props)
    })
  },
  defaultRoute: function (props) {
    var names = Object.keys(props.routes)
    return names[0]
  },
  onSwitchRoute: function (name) {
    this.setState({route: name})
  },
  render: function () {
    var routeNames = Object.keys(this.props.routes)
      , current = this.state.route
      , cls = this.props.routes[current]
    return (
      <div className='outlet'>
        <div className='outlet_head'>
          <span className='outlet_title'>outlet</span>
          <ul className='outlet_routes'>
            {
              routeNames.map(function (route) {
                var cls = 'outlet_route'
                if (route === current) {
                  cls += ' outlet_route--current'
                }
                return (
                  <li className={cls}
                    key={route}
                    onClick={this.onSwitchRoute.bind(null, route)}>
                    {route}
                  </li>
                )
              }.bind(this))
            }
          </ul>
          <button className='outlet_edit'
            onClick={this.props.onEditRoutes}/>
        </div>
        {cls && Box({
          inst: null,
          parent: null,
          changeInst: null,
          boxes: this.props.boxes,
          changeBox: this.props.onChangeBox.bind(null, cls),

          onChangeBox: this.props.onChangeBox,
          onChangeInst: this.props.onChangeInst,
          name: cls,
          trail: this.props.trail
        })}
      </div>
    )
  }
})

var Box = require('./box.jsx')

// vim: set tabstop=2 shiftwidth=2 expandtab:

