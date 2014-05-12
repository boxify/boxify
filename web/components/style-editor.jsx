/** @jsx React.DOM */

var _ = require('lodash')
  , Numput = require('./numput.jsx')
  , ButtonSwitch = require('./button-switch.jsx')
  , ToggleButton = require('./toggle-button.jsx')

var StyleEditor = module.exports = React.createClass({
  displayName: 'StyleEditor',
  getDefaultProps: function () {
    return {
      style: {flex: 'horizontal'},
      onChange: function (style) {console.log('changing', style)}
    }
  },
  onChange: function (name, value) {
    var style = _.clone(this.props.style)
    style[name] = value
    this.props.onChange(style)
  },
  render: function () {
    var style = this.props.style
    return (
      <div className='style-editor'>
        <table>
          <tr>
            <td>Orientation:</td>
            <td>
              <ButtonSwitch
                value={style.flex}
                onChange={this.onChange.bind(null, 'flex')}
                options={['horizontal', 'vertical', 'none']}/>
            </td>
          </tr>
          <tr>
            <td>Expand</td>
            <td>
              <ToggleButton
                value={style.expand === undefined ? true : style.expand}
                onChange={this.onChange.bind(null, 'expand')}/>
            </td>
          </tr>
          <tr>
            <td>Width</td>
            <td>
              <Numput value={style.width || ''} onChange={this.onChange.bind(null, 'width')}/>
            </td>
          </tr>
          <tr>
            <td>Height</td>
            <td>
              <Numput value={style.height || ''} onChange={this.onChange.bind(null, 'height')}/>
            </td>
          </tr>
        </table>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

