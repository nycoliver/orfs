var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var UploadUtils = require('../utils/UploadUtils');

var ProfileStore = require('../stores/ProfileStore');

// Can I use this?
// const Configstore = require('configstore');
// const conf = new Configstore('config');
var conf = localStorage;

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

// Obviously do this better

var _postInfo, _allPosts, _selfPosts;

try {
  _postInfo = JSON.parse(conf.getItem('postInfo'));
  _allPosts = JSON.parse(conf.getItem('allPosts'));
  _selfPosts = JSON.parse(conf.getItem('selfPosts'));
} catch (error) {
  console.log(error)
}

if (!_postInfo || !_allPosts || !_selfPosts) {
  _postInfo = {};
  _allPosts = [];
  _selfPosts = [];

  _savePosts();
}

function _savePosts() {
  conf.setItem('postInfo', JSON.stringify(_postInfo));
  conf.setItem('allPosts', JSON.stringify(_allPosts));
  conf.setItem('selfPosts', JSON.stringify(_selfPosts));
}

function _createPost(post, cb) {

  var profile = ProfileStore.getProfile();

  var postToAdd = {
    "author": profile.id,
    "username": profile.username,
    "avatar": profile.avatar,
    "content": post.content,
    "tags": post.tags,
    "date": Date.now() / 1000
  }

  // Just make this UploadUtils.uploadPost

  // Metadata should already be done before here
  if (post.type == "audio/mp3" || post.type == "audio/mpeg") {
    postToAdd.artwork = post.metadata.artwork;
    postToAdd.title = post.metadata.title;
    postToAdd.artist = post.metadata.artist;
    postToAdd.album = post.metadata.album;
    postToAdd.year = post.metadata.year;
  }

  _selfPosts.unshift(postToAdd);
  _postInfo[postToAdd.id] = postToAdd;
  _allPosts.unshift(postToAdd);
  _savePosts();

  var toPublish = {
    profile: profile, // Unsafe
    posts: _selfPosts // Unsafe
  }

  UploadUtils.publish(toPublish, function(err, res) {
    if (!err)
      cb(null, res)
    else
      cb(err)
  })
}

function _foundPost(post, cb) {
  var profile = ProfileStore.getProfile();
  if (!_postInfo[post.id]) {
    _postInfo[post.id] = post;
    _allPosts.unshift(post)
    if (post.author == profile.id)
      _selfPosts.unshift(post)
    _savePosts();
  }
  cb()
}

var PostStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  init: function() {

  },

  getAll: function() {
    return _allPosts;
  },

  get: function(id) {
    return _allPosts[id];
  }

})

PostStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.CREATE_POST:
      var post = action.post
      _createPost(post, function() {
        PostStore.emitChange();
      })
      break;
    case ActionTypes.FOUND_POST:
      var post = action.post
      _foundPost(post, function() {
        PostStore.emitChange();
      })
      break;

    default:
      // Do nothing.
  }
})

module.exports = PostStore;
