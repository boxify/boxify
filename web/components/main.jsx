/** @jsx React.DOM */

var Playground = require('./playground.jsx')
  , Library = require('./library.jsx')

  , _ = require('lodash')
  , utils = require('./utils')

var Main = module.exports = React.createClass({
  displayName: 'Main',
  getDefaultProps: function () {
    return {
      onChange: function (boxes, done) {
        console.log('want to change boxes', boxes)
      },
      boxes: {0: {name: 'root'}}
    }
  },
  onChangeBox: function (box, update, done) {
    var boxes = utils.updateBox(box, update, this.props.boxes)
    this.props.onChange(boxes, done)
  },
  onChangeInst: function (parent, i, update) {
    var boxes = utils.updateInst(parent, i, update, this.props.boxes)
    this.props.onChange(boxes)
  },
  onNewBox: function (name, done) {
    var boxes = _.clone(this.props.boxes)
      , id = this.newId()
    boxes[id] = {name: name}
    this.props.onChange(boxes, done.bind(null, id))
  },
  newId: function () {
    var id
      , i = 10000
    do {
      id = utils.genId()
      i--
      if (i < 0) {
        throw new Error('Too many collisions. There is a major problem with randomness')
      }
    } while (undefined !== this.props.boxes[id])
    return id
  },
  render: function () {
    return (
      <div className='boxify-main'>
        <Playground
          onChangeBox={this.onChangeBox}
          onChangeInst={this.onChangeInst}
          onNewBox={this.onNewBox}
          boxes={this.props.boxes}
          rootBox='root'/>
        <Library onChange={this.onChangeBox} boxes={this.props.boxes} rootBox='root'/>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

