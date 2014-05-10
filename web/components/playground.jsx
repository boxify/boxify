/** @jsx React.DOM */

var Box = require('./box.jsx')

var Playground = module.exports = React.createClass({
  displayName: 'Playground',
  render: function () {
    return (
      <div className='playground'>
        <Box
          onChangeBox={this.props.onChange}
          onChangeInst={this.props.onChangeInst}
          boxes={this.props.boxes}
          parent={null}
          trail={[]}
          name={this.props.rootBox}/>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

