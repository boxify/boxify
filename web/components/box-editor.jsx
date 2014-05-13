/** @jsx React.DOM */

var RoutesEditor = require('./routes-editor.jsx')
  , StyleEditor = require('./style-editor.jsx')
  , _ = require('lodash')

var BoxEditor = module.exports = React.createClass({
  displayName: 'BoxEditor',
  getDefaultProps: function () {
    return {
      onChangeInst: function () {console.log('changing inst')},
      onChangeBox: function (update) {console.log('changing box', update)},
      onNewBox: function (name, done) {console.log('newing box', name); done()},
      trail: [],
      startingTab: 'Routes',
      boxNames: [],
      isRoot: false,
      inst: null,
      box: null,
    }
  },
  getInitialState: function () {
    return {
      selectedTab: this.props.startingTab
    }
  },

  tabsList: function () {
    var tabs = ['Routes', 'Style']// , 'Models']
    // if (this.props.inst) tabs.unshift('Inst')
    return tabs.map(function (tab) {
      var cls = 'box-editor_tab'
      if (tab === this.state.selectedTab) {
        cls += ' box-editor_tab--selected'
      }
      return (
        <li className={cls} key={tab} onClick={this.switchTab.bind(null, tab)}>
          {tab}
        </li>
      )
    }.bind(this))
  },
  switchTab: function (tab) {
    this.setState({selectedTab: tab})
  },
  _onChangeStyle: function (style) {
    this.props.onChangeBox({style: {$set: style}})
  },
  tabs: {
    Inst: function (box) {
    },
    Style: function (box) {
      return StyleEditor({style: box.style, onChange: this._onChangeStyle})
    },
    Routes: function (box) {
      var routing = !!box.routes
      if (!routing) {
        return (
          <div className='box-editor_routes'>
            <button onClick={this.enableRouting}>Enable Routing</button>
          </div>
        )
      }

      return (
        <div className='box-editor_routes'>
          <button onClick={this.disableRouting}>Disable Routing</button>
          <RoutesEditor
            routes={box.routes}
            boxNames={this.props.boxNames}
            exclude={this.props.trail}
            onChange={this.changeRoute}
            onChangeNew={this.changeRouteNewBox}
            onRemove={this.removeRoute}
            onAdd={this.addRoute}
            onAddNew={this.addRouteNewBox}
            />
        </div>
      )
    },
    /*
    Models: function (box) {
    }
    */
  },
  enableRouting: function () {
    this.props.onChangeBox({routes: {$set: {}}})
  },
  disableRouting: function () {
    this.props.onChangeBox({routes: {$set: null}})
  },
  addRouteNewBox: function (route, boxName) {
    if (route[0] !== '/') route = '/' + route
    this.props.onNewBox(boxName, function (id) {
      var update = {routes: {}}
      update.routes[route] = {$set: id}
      this.props.onChangeBox(update)
    }.bind(this))
  },
  addRoute: function (route) {
    if (route.name[0] !== '/') route.name = '/' + route.name
    var update = {routes: {}}
    update.routes[route.name] = {$set: route.value}
    this.props.onChangeBox(update)
  },
  removeRoute: function (name) {
    var routes = _.clone(this.props.box.routes)
    delete routes[name]
    var update = {routes: {$set: routes}}
    this.props.onChangeBox(update)
  },
  changeRoute: function (orig, route) {
    if (route.name[0] !== '/') route.name = '/' + route.name
    var routes = _.clone(this.props.box.routes)
    delete routes[orig]
    routes[route.name] = route.value
    var update = {routes: {$set: routes}}
    this.props.onChangeBox(update)
  },
  changeRouteNewBox: function (orig, route, name) {
    return this.props.onNewBox(name, function (id) {
      if (route[0] !== '/') route = '/' + route
      var routes = _.clone(this.props.box.routes)
      delete routes[orig]
      routes[route] = id
      var update = {routes: {$set: routes}}
      this.props.onChangeBox(update)
    }.bind(this))
  },
  pane: function () {
    return this.tabs[this.state.selectedTab].call(this, this.props.box)
  },
  render: function () {
    if (!this.props.box) return <div className='box-editor'>No Box to edit</div>
    return (
      <div className='box-editor'>
        <ul className='box-editor_tabs'>
          {this.tabsList()}
        </ul>
        <div className='box-editor_title'>Editing {this.props.box.name}</div>
        <div className='box-editor_pane'>
          {this.pane()}
        </div>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

