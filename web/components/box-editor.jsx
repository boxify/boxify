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
      isRoot: false,
      inst: null,
      box: null,
      trail: [],
      boxNames: []
    }
  },
  getInitialState: function () {
    return {
      selectedTab: 'Routes'
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
      var boxNames = this.props.boxNames.filter(function (name) {
        return this.props.trail.indexOf(name) === -1
      }.bind(this))

      return (
        <div className='box-editor_routes'>
          <button onClick={this.disableRouting}>Disable Routing</button>
          <RoutesEditor
            routes={box.routes}
            boxNames={boxNames}
            allNames={this.props.boxNames}
            onChange={this.changeRoute}
            onRemove={this.removeRoute}
            addRoute={this.addRoute}
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
  addRoute: function (route) {
    if (route.name[0] !== '/') route.name = '/' + route.name
    var update = {routes: {}}
    update.routes[route.name] = {$set: route.value}
    if (this.props.boxNames.indexOf(route.value) === -1) {
      return this.props.onNewBox(route.value, this.props.onChangeBox.bind(null, update, null, null))
    }
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
    if (this.props.boxNames.indexOf(route.value) === -1) {
      return this.props.onNewBox(route.value, this.props.onChangeBox.bind(null, update, null, null))
    }
    this.props.onChangeBox(update)
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

