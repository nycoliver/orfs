var PostActionCreators = require('../actions/PostActionCreators');

var React = require('react');
var Post = require('./Post.react');
var NewPost = require('./NewPost.react');
//
var PostStore = require('../stores/PostStore');
var PeerStore = require('../stores/PeerStore'); // is this the right place?

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

  render: function() {

    var posts = this.state.posts;

    if (Object.keys(posts).length == 0)
      return (
        <div className="stream">
          <div className="noposts">
            <h2>Loading posts...</h2>
            <h3>Make sure ipfs daemon is running.</h3>
          </div>
        </div>
      )

    var posts = this.state.posts;

    var files = Object.keys(posts).map(function(file, index) {
      file = posts[file];

      return (<Post
        type={file.type}
        author={file.author}
        username={file.username}
        avatar={file.avatar}
        id={file.id}
        date={file.date}
        name={file.name}
        caption={file.caption}

        artwork={file.artwork}
        artist={file.artist}
        title={file.title}
        key={index}
      />)
    });

    return (
      React.createElement("div", {className: "feed"},
        // React.createElement(NewPost),
        files
      )
    );

  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
})

module.exports = Feed;
