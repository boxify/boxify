/** @jsx React.DOM */

var Playground = require('./playground.jsx')
  , Library = require('./library.jsx')

  , _ = require('lodash')
  , utils = require('./utils')

var Boxify = module.exports = React.createClass({
  displayName: 'Boxify',
  getDefaultProps: function () {
    return {
      saveBoxes: function (path, boxes) {
        console.log('saving boxes to', path, boxes)
      },
      getSavePath: function (done) {
        console.log('Getting save path')
        done('some place.js')
      },
      doOpen: function (path, done) {
        console.log('wanting to open')
        done('some place', {0:{name: 'root'}})
      },
      getConfig: function (done) {
        console.log('want config')
        done({
          history: []
        })
      }
    }
  },
  getInitialState: function () {
    return {
      config: null,
      project_path: null,
      boxes: {
        0: {name: 'root'}
      }
    }
  },
  componentWillMount: function () {
    this.props.getConfig(function (config) {
      this.setState({config: config})
    }.bind(this))
  },

  onSave: function () {
    if (!this.state.project_path) return this.onSaveAs()
    this.props.saveBoxes(this.state.project_path, this.state.boxes, function () {
      this.setState({modified: false})
    }.bind(this))
  },
  onSaveAs: function () {
    this.props.getSavePath(function (dest) {
      if (!dest) return
      this,setState({
        project_path: dest
      }, this.onSave)
    }.bind(this))
  },
  onOpen: function () {
    this.props.getOpenPath(function (path) {
      this.openProject(path)
    }.bind(this))
  },
  openProject: function (path) {
    // TODO any loading indicator here? Shouldn't take long at all
    this.props.openProject(path, function (boxes) {
      this.setState({
        project_path: path,
        boxes: boxes
      })
    })
  },
  onChangeBoxes: function (boxes) {
    this.setState({boxes: boxes, modified: true})
  },
  render: function () {
    return (
      <div className='boxify'>
        <div className='boxify_header'>
          <div className='boxify_title'>
            Boxify
          </div>
          <HistoryList list={this.state.config.history} onSelect={this.openProject}/>
          <button className='boxify_open' onClick={this.props.onOpen}/>
          {this.state.project_path &&
            d.button({className: 'boxify_save', onClick: this.props.onSave.bind(null, this.state.project_path})}
          <button className='boxify_saveas' onClick={this.props.onSaveAs}/>
          <div className='boxify_project'>
            {this.state.project_path}
          </div>
        </div>
        <Main boxes={this.state.boxes} onChange={this.onChangeBoxes}/>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

