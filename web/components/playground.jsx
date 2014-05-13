/** @jsx React.DOM */

var Box = require('./box.jsx')

var Playground = module.exports = React.createClass({
  displayName: 'Playground',
  render: function () {
    return (
      <div className='playground'>
        <Box
          onChangeBox={this.props.onChangeBox}
          onChangeInst={this.props.onChangeInst}
          onNewBox={this.props.onNewBox}
          changeBox={this.props.onChangeBox.bind(null, this.props.rootBox)}
          boxes={this.props.boxes}
          parent={null}
          trail={[]}
          changeInst={null}
          id={this.props.rootBox}/>
      </div>
    )
  }
})

// vim: set tabstop=2 shiftwidth=2 expandtab:

