/** @jsx React.DOM */

var Numput = module.exports = React.createClass({
  displayName: 'Numput',
  getDefaultProps: function () {
    return {
      onChange: function (val) {console.log('changing', val)},
      value: ''
    }
  },
  onChange: function (e) {
    this.props.onChange(e.target.value)
  },
  onKeyDown: function (e) {
    if (e.keyCode === 40) {
      this.change(-5)
    } else if (e.keyCode === 38) {
      this.change(5)
    }
  },
  change: function (by) {
    var val = parseFloat(this.props.value || 0)
    if (isNaN(val)) return
    var newv = val + by + this.props.value.slice('' + val)
    this.props.onChange(newv)
  },
  render: function () {
    return (
      <input className='numput'
        onKeyDown={this.onKeyDown}
        value={this.props.value || ''}
        onChange={this.onChange}/>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

