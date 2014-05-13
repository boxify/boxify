
var utils = require('./utils')
  , _ = require('lodash')

function clone(a) {
  var b = {}
  for (var c in a) {
    b[c] = a[c]
  }
  return b
}

var BoxWrapper = React.createClass({
  getDefaultProps: function () {
    return {
      props: null,
      cls: null
    }
  },
  getInitialState: function () {
    return {boxes: this.props.props.boxes}
  },
  componentWillReceiveProps: function (props) {
    this.setState({boxes: props.props.boxes})
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
    var props = clone(this.props.props)
    props.boxes = this.state.boxes
    props.changeBox = this.onChangeBox.bind(null, this.props.props.id)
    props.onChangeBox = this.onChangeBox
    props.onChangeInst = this.onChangeInst
    props.onNewBox = this.onNewBox
    return this.props.cls(props)
  }
})

module.exports = {
  "simple": {
    "id": "0",
    "inst": {"type": "box", "box": "0"},
    "changeInst": false,
    "boxes": {
      "0": {
        "name": "Awesome",
        "style": {
          "flex": "vertical"
        },
        "children": [
          {"type": "box", "box": "1"},
          {"type": "box", "box": "2"}
        ]
      },
      1: {"name": "Main"},
      2: {"name": "Features"}
    }
  },
  "outletted": {
    "id": "1",
    "inst": {"type": "box", "box": "1"},
    "changeInst": false,
    "boxes": {
      1: {
        "name": "Partless",
        "style": {
          "flex": "vertical"
        },
        "routes": {
          "/": "10",
          "/features": "20"
        },
        "children": [
          {"type": "box", "box": "30"},
          {"type": "outlet"}
        ]
      },
      10: {"name": "Main"},
      30: {
        "name": "Header",
        "style": {
          "expand": false
        }
      },
      20: {"name": "Features"}
    }
  },
  _wrapState: {
    wrapper: BoxWrapper
  }
}


