/** @jsx React.DOM */

var LibraryEntry = require('./library-entry.jsx')

var Library = module.exports = React.createClass({
  displayName: 'Library',
  getDefaultProps: function () {
    return {
      boxes: {},
      rootBox: 'root',
      onChange: function () {console.log('want to change')}
    }
  },
  render: function () {
    var names = Object.keys(this.props.boxes)
    return (
      <div className='library'>
        {
          names.map(function (name) {
            return <LibraryEntry 
                      isRoot={name === this.props.rootBox}
                      onChange={this.props.onChange}
                      box={this.props.boxes[name]}
                      name={name}/>
          }.bind(this))
        }
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

