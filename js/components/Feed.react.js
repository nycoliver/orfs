var PostActionCreators = require('../actions/PostActionCreators');

var React = require('react');
var PhotoPost = require('./PhotoPost.react');
var AudioPost = require('./AudioPost.react');
var VideoPost = require('./VideoPost.react');
var NewPost = require('./NewPost.react');

var PostStore = require('../stores/PostStore');

var UploadUtils = require('../utils/UploadUtils')

var getStateFromStores = function() {
  return {
    posts: PostStore.getAll()
  }
}

var Feed = React.createClass({
  displayName: "Feed",

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
    var files = this.state.posts.map(function(file, index) {
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
    this.setState(getStateFromStores(this.props.threadID));
  }
})

module.exports = Feed;
