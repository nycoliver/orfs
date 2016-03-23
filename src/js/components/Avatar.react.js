var React = require('react');

var Avatar = React.createClass({displayName: "Avatar",
  render: function() {
    var avatarUrl = (this.props.image) ? "url('http://localhost:8080/ipfs/" + this.props.image + "')" : null;
    return (
      <div id="avatar" className="w-100 h-100 bg-cv" style={{backgroundImage: avatarUrl}}>

      </div>
    )
  }
})

module.exports = Avatar;
