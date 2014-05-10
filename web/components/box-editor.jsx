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
      isRoot: false,
      inst: null,
      box: null,
      trail: [],
      boxNames: []
    }
  },
  getInitialState: function () {
    return {
      selectedTab: 'Style'
    }
  },

  tabsList: function () {
    var tabs = ['Style', 'Routes']// , 'Models']
    // if (this.props.inst) tabs.unshift('Inst')
    return tabs.map(function (tab) {
      var cls = 'box-editor_tab'
      if (tab === this.state.selectedTab) {
        cls += ' box-editor_tab--selected'
      }
      return (
        <li className={cls} onClick={this.switchTab.bind(null, tab)}>
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
  addRoute: function (name, value) {
    var update = {routes: {}}
    update.routes[name] = {$set: value}
    this.props.onChangeBox(update)
  },
  changeRoute: function (orig, name, value) {
    var routes = _.clone(this.props.box.routes)
    delete routes[orig]
    routes[name] = value
    this.props.onChangeBox({routes: {$set: routes}})
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

