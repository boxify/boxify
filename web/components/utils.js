
var _ = require('lodash')

module.exports = {
  offset: offset,
  isGoodRoute: isGoodRoute,
  updateInst: updateInst,
  updateBox: updateBox,
  genId: genId
}

function genId() {
  var id = ''
    , chars = 'abcdef0123456789ghijklmnopqrstuvwxyz'
  for (var i=0; i<10; i++) {
    id += chars[parseInt(Math.random() * chars.length, 10)]
  }
  return id
}

function isGoodRoute(route, taken) {
  route = route.replace(/\/$/, '').toLowerCase()
  if (route[0] !== '/') route = '/' + route
  if (taken.indexOf(route) !== -1) return false
  return !route.slice(1).match(/[\s\/]/)
}

function offset(node) {
  var top = 0, left = 0
  do {
    top += node.offsetTop
    left += node.offsetLeft
    node = node.offsetParent
  } while (node)
  return {top: top, left: left}
}

function updateBox(name, update, boxes) {
  if (update === 'delete') {
    boxes = _.clone(boxes)
    delete boxes[name]
    return boxes
  }
  if (update === 'new') {
    boxes = _.clone(boxes)
    boxes[name] = {name: name}
    return boxes
  }
  var full = {}
  full[name] = update
  return React.addons.update(boxes, full)
}

function updateInst(parent, i, update, boxes) {
  var full = {}
  full[parent] = {children: {}}
  if (update === 'delete') {
    full[parent].children = {$splice: [[i, 1]]}
    if (boxes[parent].children.length === 1) {
      full[parent].children = {$set: null}
    }
  } else {
    full[parent].children[i] = update
  }
  return React.addons.update(boxes, full)
}

