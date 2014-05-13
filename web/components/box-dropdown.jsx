/** @jsx React.DOM */

var BoxPicker = require('./box-picker.jsx')

var BoxDropdown = module.exports = React.createClass({
  displayName: 'BoxDropdown',
  getDefaultProps: function () {
    return {
      value: null,
      boxNames: [],
      exclude: [],
      canAddOutlet: false,
      onChange: function (value) {console.log(value)},
      onChangeNew: function (title) {console.log('new', title)}
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
    var name = '[add box]'
    for (var i=0; i<this.props.boxNames.length; i++) {
      if (this.props.boxNames[i].id == this.props.value) {
        name = this.props.boxNames[i].name
      }
    }
    return (
      <div className='box-dropdown'>
        <div
          onClick={this.show}
          className='box-dropdown_value'>{name}</div>
        {this.state.showing && BoxPicker({
          boxNames: this.props.boxNames,
          exclude: this.props.exclude.concat([this.props.value]),
          onSelect: this.props.onChange,
          onNew: this.props.onChangeNew,
          canAddOutlet: this.props.canAddOutlet,
          onHide: this.hide
        })}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

