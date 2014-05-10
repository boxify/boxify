
module.exports = {
  offset: offset
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

