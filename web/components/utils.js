
module.exports = {
  offset: offset,
  isGoodRoute: isGoodRoute
}

function isGoodRoute(route, taken) {
  route = route.replace(/^\//, '').replace(/\/$/, '').toLowerCase()
  if (taken.indexOf(route) !== -1) return false
  return !route.match(/[\s\/]/)
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

