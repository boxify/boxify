/** @jsx React.DOM */

var utils = require('./utils')

var AddBox = module.exports = React.createClass({
  displayName: 'AddBox',
  getDefaultProps: function () {
    return {
      onAdd: function (name) {console.log('want to add', name)},
      boxNames: [],
      allNames: []
    }
  },
  getInitialState: function () {
    return {
      showing: false,
      newName: ''
    }
  },
  componentDidUpdate: function (props, state) {
    if (state.showing === this.state.showing) return
    if (state.showing) {
      window.removeEventListener('mousedown', this.hide)
    } else {
      window.addEventListener('mousedown', this.hide)
      this.adjustPlacement()
      this.refs.input.getDOMNode().focus()
    }
  },
  adjustPlacement: function () {
    var node = this.refs.list.getDOMNode()
      , pos = utils.offset(node)
      , ppos = utils.offset(this.getDOMNode())
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
  hide: function () {
    this.setState({showing: false, pos: null})
  },
  show: function () {
    this.setState({showing: true})
  },
  onAdd: function (name, e) {
    e.stopPropagation()
    e.preventDefault()
    this.hide()
    this.props.onAdd(name)
  },
  onMouseDown: function (e) {
    e.stopPropagation()
  },
  onChangeNew: function (e) {
    this.setState({
      newName: e.target.value,
      goodNew: this.props.allNames.indexOf(e.target.value) === -1
    })
  },
  onKeyDown: function (e) {
    if (e.keyCode === 13) { // return
      if (!this.state.goodNew) return
      this.hide()
      this.props.onAdd(this.state.newName, true)
    }
  },
  droplist: function () {
    var names = {}
      , style = {}
    if (this.state.pos) {
      style.top = this.state.pos.top
      style.left = this.state.pos.left
      style.marginLeft = 0
      style.marginTop = 0
    }
    return (
      <ul ref='list' style={style} className='add-box_list' onMouseDown={this.onMouseDown}>
        {
          this.props.boxNames.map(function (name) {
            return (
              <li className='add-box_entry' onClick={this.onAdd.bind(null, name)}>{name}</li>
            )
          }.bind(this))
        }
        <li className='add-box_new'>
          <input className={'add-box_input' + (this.state.goodNew ? ' add-box_input--good' : '')}
            ref='input'
            onKeyDown={this.onKeyDown}
            placeholder='New Box'
            onChange={this.onChangeNew}
            value={this.state.newName}/>
        </li>
      </ul>
    )
  },
  render: function () {
    return (
      <div className={'add-box' + (this.state.showing ? ' add-box--showing' : '')} onClick={this.show}>
        {this.state.showing && this.droplist()}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

