
var d = React.DOM

module.exports = {
  makeChildren: makeChildren
}

// this is the component
function makeChildren(children, dirname) {
  if (!children) return []
  return children.map(function (item) {
    if (item.type === 'outlet') {
      if (item.surround) {
        return d.div({className: item.surround}, this.outlet())
      }
      return this.outlet()
    }
    if (item.type === 'div') {
      return d.div.apply(d, [{className: item.className}].concat(makeChildren(item.children, dirname)))
    }
    var props = item.params ? stringParams(item.params, this.props, this.state, this) : {}
    if ('string' === typeof item.box) {
      item.box = require(path.resolve(path.join(dirname, item.box)))
    }
    // TODO context propagation here?
    return item.box(props)
  }.bind(this))
}

