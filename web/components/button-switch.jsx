/** @jsx React.DOM */

var ButtonSwitch = module.exports = React.createClass({
  displayName: 'ButtonSwitch',
  getDefaultProps: function () {
    return {
      value: '',
      options: [],
      onChange: function (value) {console.log('changing', value)}
    }
  },
  render: function () {
    return (
      <ul className='button-switch'>
        {
          this.props.options.map(function (option) {
            var name, value
            if (Array.isArray(option)) {
              name = option[0]
              value = option[1]
            } else {
              name = value = option
            }
            var cls = 'button-switch_item'
              , selected = value === this.props.value
            if (selected) {
              cls += ' button-switch_item--selected'
            }
            return <li key={value} className={cls}
                      onClick={!selected && this.props.onChange.bind(null, value)}>{name}</li>
          }.bind(this))
        }
      </ul>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

