/** @jsx React.DOM */

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
      this.refs.input.getDOMNode().focus()
    }
  },
  hide: function () {
    this.setState({showing: false})
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
      this.props.onAdd(this.state.newName)
    }
  },
  droplist: function () {
    var names = {}
    return (
      <ul className='add-box_list' onMouseDown={this.onMouseDown}>
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

