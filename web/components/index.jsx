/** @jsx React.DOM */

var Playground= = require('./playground.jsx')
  , Library = require('./library.jsx')

var Boxify = module.exports = React.createClass({
  displayName: 'Boxify',
  getInitialState: function () {
    return {
      boxes: {
        root: {
          name: 'root',
        }
      },
    }
  },
  onChangeBox: function (box, update) {
    if (update === 'delete') {
      var boxes = _.clone(this.state.boxes)
      delete boxes[box]
      return this.setState({boxes: boxes})
    }
    var full = {}
    full[box] = update
    this.setState({
      boxes: React.addons.update(this.state.boxes, full)
    })
  },
  onChangeInst: function (parent, i, update) {
    var full = {}
    full[parent] = {children: {}}
    if (update === 'delete') {
      full[parent].children = {$splice: [[i, 1]]}
    } else {
      full[parent].children[i] = update
    }
    this.setState({
      boxes: React.addons.update(this.state.boxes, full)
    })
  },
  render: function () {
    return (
      <div className='boxify'>
        <Playground
          onChangeBox={this.onChangeBox}
          onChangeInst={this.onChangeInst}
          boxes={this.state.boxes}
          rootBox='root'/>
        <Library onChange={this.onChangeBox} boxes={this.state.boxes} rootBox='root'/>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

