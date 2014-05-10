/** @jsx React.DOM */

var BoxPicker = require('./box-picker.jsx')

var BoxDropdown = module.exports = React.createClass({
  displayName: 'BoxDropdown',
  getDefaultProps: function () {
    return {
      value: '[add box]',
      boxNames: [],
      allNames: [],
      canAddOutlet: false,
      onChange: function (value) {console.log(value)}
    }
  },
  getInitialState: function () {
    return {
      showing: false
    }
  },
  show: function () {
    this.setState({showing: true})
  },
  hide: function () {
    this.setState({showing: false})
  },
  render: function () {
    var names = this.props.boxNames.slice()
      , ix = names.indexOf(this.props.value)
    if (ix !== -1) names.splice(ix, 1)
    return (
      <div className='box-dropdown'>
        <div
          onClick={this.show}
          className='box-dropdown_value'>{this.props.value}</div>
        {this.state.showing && BoxPicker({
          boxNames: names,
          allNames: this.props.allNames,
          onSelect: this.props.onChange,
          canAddOutlet: this.props.canAddOutlet,
          onHide: this.hide
        })}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

