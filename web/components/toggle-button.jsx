/** @jsx React.DOM */

var ToggleButton = module.exports = React.createClass({
  displayName: 'ToggleButton',
  getDefaultProps: function () {
    return {
      value: false,
      onChange: function (value) {
        console.log('toggle change', value)
      }
    }
  },
  onClick: function () {
    this.props.onChange(!this.props.value)
  },
  render: function () {
    var cls = 'toggle-button'
    if (this.props.value) {
      cls += ' toggle-button--active'
    }
    return (
      <button className={cls} onClick={this.onClick}/>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

