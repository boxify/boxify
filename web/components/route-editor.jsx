/** @jsx React.DOM */

var BoxDropdown = require('./box-dropdown.jsx')
  , utils = require('./utils')

var RouteEditor = module.exports = React.createClass({
  displayName: 'RouteEditor',
  getDefaultProps: function () {
    return {
      initialValue: {name: '', value: ''},
      boxNames: [],
      allNames: [],
      allChanges: false,
      routesTaken: [],
      onChange: function (value) {console.log('changing', value)}
    }
  },
  getInitialState: function () {
    return {
      name: this.props.initialValue.name
    }
  },
  onChangeName: function (e) {
    if (this.props.allChanges) {
      this.props.onChange({
        name: e.target.value,
        value: this.props.initialValue.value
      })
      return
    }
    this.setState({name: e.target.value})
  },
  onBlur: function () {
    var name = this.state.name
    if (!utils.isGoodRoute(name, this.props.routesTaken)) {
      return this.setState({name: this.props.initialValue.name})
    }
    this.props.onChange({name: name, value: this.props.initialValue.value})
  },
  onChangeValue: function (value) {
    this.props.onChange({name: this.state.name, value: value})
  },
  componentWillReceiveProps: function (props) {
    this.setState({name: props.initialValue.name})
  },
  render: function () {
    var inp_cls = 'route-editor_input'
    if (utils.isGoodRoute(this.state.name, this.props.routesTaken)) {
      inp_cls += ' route-editor_input--good'
    }
    return (
      <div className='route-editor'>
        <input
          className={inp_cls}
          placeholder='Route'
          value={this.state.name}
          onChange={this.onChangeName}
          onBlur={this.onBlur}/>
        <BoxDropdown
          value={this.props.initialValue.value}
          canAddOutlet={false}
          boxNames={this.props.boxNames}
          allNames={this.props.allNames}
          onChange={this.onChangeValue}/>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

