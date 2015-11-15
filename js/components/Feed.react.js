var PostActionCreators = require('../actions/PostActionCreators');

var React = require('react');
var PhotoPost = require('./PhotoPost.react');
var AudioPost = require('./AudioPost.react');
var VideoPost = require('./VideoPost.react');
var NewPost = require('./NewPost.react');

var PostStore = require('../stores/PostStore');
var PeerStore = require('../stores/PeerStore'); // is this the right place?
PeerStore.init(); // Is this right??????

var UploadUtils = require('../utils/UploadUtils')

var getStateFromStores = function() {
  return {
    posts: PostStore.getAll()
  }
}

var Feed = React.createClass({
  displayName: "Feed",

  init: function() {
    // PeerStore.checkForUpdates
  },

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    PostStore.addChangeListener(this._onChange);
  },

  drop: function(files) {
    var file = files[0];
    PostActionCreators.createPost(file);
  },

  render: function() {
    if (this.state.posts.length == 0)
      return (
        <div clasName="noposts">
        <h2>No Posts!</h2>
        </div>
      )
    
    var posts = this.state.posts;

    var files = Object.keys(posts).map(function(file, index) {
      file = posts[file];
      if (file.type == "image/jpeg" || file.type == "image/png") {
        return React.createElement(PhotoPost, {
          author: file.author,
          id: file.id,
          title: file.title,
          caption: file.caption,
          key: index}); // Size, icon, what else?
      }
      else if (file.type == "audio/x-m4a" || file.type == "audio/mp3") {
        return React.createElement(AudioPost, {
          author: file.author,
          id: file.id,
          artwork: file.artwork,
          title: file.title,
          caption: file.caption,
          key: index}); // Size, icon, what else?
      }
      else if (file.type == "video/mp4" || "video/webm" || "video/") {
        return React.createElement(VideoPost, {
          author: file.author,
          id: file.id,
          title: file.title,
          caption: file.caption,
          key: index}); // Size, icon, what else?
      }
    });

    return (
      React.createElement("div", {className: "stream"},
        React.createElement(NewPost, {onDrop: this.drop}),
        files
      )
    );

  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
})

module.exports = Feed;
