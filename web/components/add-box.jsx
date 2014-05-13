/** @jsx React.DOM */

var BoxPicker = require('./box-picker.jsx')

var AddBox = module.exports = React.createClass({
  displayName: 'AddBox',
  getDefaultProps: function () {
    return {
      onAdd: function (id) {console.log('want to add', id)},
      onAddNew: function (name) {console.log('adding new', name)},
      canAddOutlet: false,
      // [{id: _, name: str}, ...}
      boxNames: [],
      // [id, id...]
      exclude: []
    }
  },
  getInitialState: function () {
    return {
      showing: false,
      newName: ''
    }
  },
  hide: function () {
    this.setState({showing: false})
  },
  show: function () {
    this.setState({showing: true})
  },
  render: function () {
    return (
      <div className={'add-box' + (this.state.showing ? ' add-box--showing' : '')} onClick={this.show}>
        {this.state.showing && BoxPicker({
          boxNames: this.props.boxNames,
          exclude: this.props.exclude,
          canAddOutlet: this.props.canAddOutlet,
          onSelect: this.props.onAdd,
          onNew: this.props.onAddNew,
          onHide: this.hide
        })}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

