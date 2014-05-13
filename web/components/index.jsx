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
        0: {
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
  onNewBox: function (name, done) {
    var boxes = _.clone(this.state.boxes)
      , id = this.newId()
    boxes[id] = {name: name}
    this.setState({boxes: boxes}, done.bind(null, id))
  },
  newId: function () {
    var id
    do {
      id = parseInt(Math.random() * 1000)
    } while (undefined !== this.state.boxes[id])
    return id
  },
  render: function () {
    return (
      <div className='boxify'>
        <Playground
          onChangeBox={this.onChangeBox}
          onChangeInst={this.onChangeInst}
          onNewBox={this.onNewBox}
          boxes={this.state.boxes}
          rootBox='root'/>
        <Library onChange={this.onChangeBox} boxes={this.state.boxes} rootBox='root'/>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

