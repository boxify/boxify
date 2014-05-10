
var d = React.DOM
  , stringParams = require('react-model/lib/utils').stringParams
  , Model = require('react-model')
  , Router = require('react-router')

  , utils = require('utils')
  , path = require('path')

module.exports = function (box, proto, dirname) {
  var obj = comleteProto(box, proto, dirname)
  return React.createClass(obj)
}

function comleteProto(box, proto, dirname) {
  proto.displayName = box.name
  delete box.name
  if (!proto.render) {
    var children = box.children || {type: 'outlet'}
      , className = box.className ? box.className : toClassName(proto.displayName)
    proto.render = function () {
      return d.div.apply(null, [{className: className}].concat(utils.makeChildren.call(this, children, dirname)))
    }
  }
  delete box.children
  var name
  for (name in box) {
    proto[name] = box[name]
  }
  for (name in proto.routes) {
    if ('string' === typeof proto.routes[name]) {
      proto.routes[name] = require(path.resolve(path.join(dirname, proto.routes[name])))
    }
  }
  if (proto.routes) {
    if (!proto.mixins) proto.mixins = []
    proto.mixins.push(Router)
    if (proto.routeParams) {
      for (name in proto.routeParams) {
        proto.routes[name] = {
          comp: proto.routes[name],
          params: proto.routeParams[name]
        }
      }
    }
  }
  if (proto.models) {
    if (!proto.mixins) proto.mixins = []
    proto.mixins.push(Model)
    if (proto.modelParams) {
      for (name in proto.modelParams) {
        proto.models[name] = {
          name: proto.models[name],
          params: proto.modelParams[name]
        }
      }
    }
  }
  return proto
}

function toClassName(what) {
  what.replace(/[A-Z]/g, function (c, i) {
    return (i > 0 ? '-' : '') + c.toLowerCase()
  })
}

