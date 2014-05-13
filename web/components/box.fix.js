
var utils = require('./utils')

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
  render: function () {
    var props = clone(this.props.props)
    props.boxes = this.state.boxes
    props.changeBox = this.onChangeBox.bind(null, this.props.props.name)
    props.onChangeBox = this.onChangeBox
    props.onChangeInst = this.onChangeInst
    return this.props.cls(props)
  }
})

module.exports = {
  "simple": {
    "name": "Awesome",
    "inst": {"type": "box", "box": "Awesome"},
    "changeInst": false,
    "boxes": {
      "Awesome": {
        "name": "Awesome",
        "style": {
          "flex": "vertical"
        },
        "children": [
          {"type": "box", "box": "Features"},
          {"type": "box", "box": "Main"}
        ]
      },
      "Main": {"name": "Main"},
      "Features": {"name": "Features"}
    }
  },
  "outletted": {
    "name": "Awesome",
    "inst": {"type": "box", "box": "Awesome"},
    "changeInst": false,
    "boxes": {
      "Awesome": {
        "style": {
          "flex": "vertical"
        },
        "routes": {
          "/": "Main",
          "/features": "Features"
        },
        "children": [
          {"type": "box", "box": "Header"},
          {"type": "outlet"}
        ]
      },
      "Main": {"name": "Main"},
      "Header": {
        "name": "Header",
        "style": {
          "expand": false
        }
      },
      "Features": {"name": "Features"}
    }
  },
  _wrapState: {
    wrapper: BoxWrapper
  }
}


