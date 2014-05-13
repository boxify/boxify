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
    var ids = Object.keys(this.props.boxes)
    return (
      <div className='library'>
        {
          ids.map(function (id) {
            return <LibraryEntry 
                      isRoot={id === this.props.rootBox}
                      onChange={this.props.onChange}
                      box={this.props.boxes[id]}
                      id={id}/>
          }.bind(this))
        }
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

