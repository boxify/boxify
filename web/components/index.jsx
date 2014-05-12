/** @jsx React.DOM */

var Playground = require('./playground.jsx')
  , Library = require('./library.jsx')

  , _ = require('lodash')
  , utils = require('./utils')

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
  onChangeBox: function (box, update, done) {
    var boxes = utils.updateBox(box, update, this.state.boxes)
    this.setState({boxes: boxes}, done)
  },
  onChangeInst: function (parent, i, update) {
    var boxes = utils.updateInst(parent, i, update, this.state.boxes)
    this.setState({boxes: boxes})
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

