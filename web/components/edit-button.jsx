/** @jsx React.DOM */

var d = React.DOM
  , BoxEditor = require('./box-editor.jsx')

var EditButton = module.exports = React.createClass({
  displayName: 'EditButton',
  getDefaultProps: function () {
    return {
      onChangeBox: function (update) {console.log('changing', update)},
      onChangeInst: function (update) {console.log('changing inst', update)},
      isRoot: false,
      inst: null,
      box: {},
    }
  },
  getInitialState: function () {
    return {
      editing: false
    }
  },
  onRemove: function () {
    if (this.props.inst) {
      this.props.onChangeInst('delete')
    } else {
      this.props.onChangeBox('delete')
    }
  },
  onEdit: function () {
    this.setState({editing: true})
  },
  editor: function () {
    if (!this.state.editing) return
    return (
      <div className='edit-button_editor'>
        <div className='edit-button_back' onClick={this.close}/>
        <BoxEditor
          onChangeInst={this.props.onChangeInst}
          onChangeBox={this.props.onChangeBox}
          isRoot={this.props.isRoot}
          inst={this.props.inst}
          box={this.props.box}/>
      </div>
    )
  },
  close: function () {
    this.setState({editing: false})
  },
  render: function () {
    return (
      <div className='edit-button'>
        {!this.props.isRoot && d.button({className: 'edit-button_x', onClick: this.onRemove})}
        <button className='edit-button_ed' onClick={this.onEdit}/>
        {this.editor()}
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

