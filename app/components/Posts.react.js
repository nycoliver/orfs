var React = require('react');

var PostStore = require('../stores/PostStore');

var Post = require('./Post.react');
// var AudioPost = require('./AudioPost.react');
// var VideoPost = require('./VideoPost.react');

var getStateFromStores = function() {
  return {
    posts: PostStore.getAll() // Just get posts of user id
  }
}


var Posts = React.createClass({
  displayName: 'Posts',

  getInitialState: function() {
    return getStateFromStores();
  },


  render: function render() {

    var rawPosts = this.state.posts;

    var posts = Object.keys(rawPosts).map(function(file, index) {
      file = rawPosts[file];
      return (
        <Post
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
        key={index} />
      )
    });
    return (
      <div className="posts">
        {posts}
      </div>
    );
  }

})

module.exports = Posts
