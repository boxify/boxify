/** @jsx React.DOM */

var EditButton = require('./edit-button.jsx')

var LibraryEntry = module.exports = React.createClass({
  displayName: 'LibraryEntry',
  getDefaultProps: function () {
    return {
      isRoot: false,
      onChange: function () {console.log('changing')},
      box: {},
      name: 'SomeBox'
    }
  },
  render: function () {
    return (
      <div className='library-entry'>
        <EditButton onChangeBox={this.props.onChange} box={this.props.box} isRoot={this.props.isRoot}/>
        <div className='library-entry_name'>{this.props.name}</div>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

