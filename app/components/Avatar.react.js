var React = require('react');

var Avatar = require('./Avatar.react')

var Avatar = React.createClass({displayName: "Avatar",
  render: function() {
    var avatarUrl = (this.props.image) ? "url('http://localhost:8080/ipfs/" + this.props.image + "')" : null;
    return (
      <div className="avatar" style={{backgroundImage: avatarUrl}} onDrop={this.props.onDrop}>

      </div>
    )
  }
})

module.exports = Avatar;
