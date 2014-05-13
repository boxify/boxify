/** @jsx React.DOM */

var utils = require('./utils')
  , d = React.DOM

function isGood(name) {
  return !!name.match(/^[a-zA-Z0-9]+$/)
}

var BoxPicker = module.exports = React.createClass({
  displayName: 'BoxPicker',
  getDefaultProps: function () {
    return {
      onHide: function () {console.log('want to hide')},
      onSelect: function (name, isNew) {console.log('selecting', name, isNew)},
      canAddOutlet: false,
      boxNames: [],
      allNames: []
    }
  },
  getInitialState: function () {
    return {
      newName: '',
      pos: null
    }
  },
  componentWillUnmount: function () {
    window.removeEventListener('mousedown', this.props.onHide)
  },
  componentDidMount: function (props, state) {
    window.addEventListener('mousedown', this.props.onHide)
    this.adjustPlacement()
    this.refs.input.getDOMNode().focus()
  },
  adjustPlacement: function () {
    var node = this.getDOMNode()
      , pos = utils.offset(node)
      , ppos = utils.offset(node.offsetParent)
    if (pos.left < 0) pos.left = 0
    if (pos.top < window.scrollY) pos.top = window.scrollY
    if (pos.left + node.offsetWidth > window.innerWidth) {
      pos.left = window.innerWidth - node.offsetWidth
    }
    if (pos.top + node.offsetHeight > window.innerHeight + window.scrollY) {
      pos.top = window.innerHeight + window.scrollY - node.offsetHeight
    }
    this.setState({
      pos: {
        top: pos.top - ppos.top,
        left: pos.left - ppos.left,
      }
    })
  },
  onSelect: function (name, e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onHide()
    this.props.onSelect(name)
  },
  onMouseDown: function (e) {
    e.stopPropagation()
  },
  onChangeNew: function (e) {
    this.setState({
      newName: e.target.value,
      goodNew: isGood(e.target.value) && this.props.allNames.indexOf(e.target.value) === -1
    })
  },
  onKeyDown: function (e) {
    if (e.keyCode === 13) { // return
      if (!this.state.goodNew) return
      this.props.onHide()
      this.props.onSelect(this.state.newName, true)
    }
  },
  render: function () {
    var style = {}
    if (this.state.pos) {
      style.top = this.state.pos.top
      style.left = this.state.pos.left
      style.marginLeft = 0
      style.marginTop = 0
    }
    return (
      <ul ref='list' style={style} className='box-picker' onMouseDown={this.onMouseDown}>
        {
          this.props.boxNames.map(function (name) {
            return (
              <li className='box-picker_entry' onClick={this.onSelect.bind(null, name)}>{name}</li>
            )
          }.bind(this))
        }
        {this.props.canAddOutlet && d.li({className: 'box-picker_outlet box-picker_entry', onClick: this.onSelect.bind(null, '<outlet>')}, '[outlet]')}
        <li className='box-picker_new'>
          <input className={'box-picker_input' + (this.state.goodNew ? ' box-picker_input--good' : '')}
            ref='input'
            onKeyDown={this.onKeyDown}
            placeholder='New Box'
            onChange={this.onChangeNew}
            value={this.state.newName}/>
        </li>
      </ul>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

