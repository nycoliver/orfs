var React = require('react');
var Dropzone = require('./Dropzone.react');

var ProfileStore = require('../stores/ProfileStore');

function getStateFromStores() {
  return {
    profile: ProfileStore.getProfile()
  }
}

var NewPost = React.createClass({
  displayName: "NewPost",

  getInitialState: function() {
    return getStateFromStores();
  },

  render: function() {
    var style = {
      width: 500,
      height: 100,
      borderStyle: "dashed"
    }
    
    return(
      React.createElement("div", {className: "post"},
        React.createElement("img", {id: "avatar", src: 'http://localhost:8080/ipfs/' + this.state.profile.avatar}),
        React.createElement(Dropzone, {onDrop: this.props.onDrop, style: style}, null)
      )
    )
  }
})

module.exports = NewPost;
