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

// Obviously this is super messed up
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
    "date": Date.now() / 1000,
    "content": post.content,
    "tags": post.tags
  }

  // Metadata should already be done before here
  if (post.type == "audio/mp3" || post.type == "audio/mpeg") {
    postToAdd.artwork = post.metadata.artwork;
    postToAdd.title = post.metadata.title;
    postToAdd.artist = post.metadata.artist;
    postToAdd.album = post.metadata.album;
    postToAdd.year = post.metadata.year;
  }

  try {
    var postString = JSON.stringify(postToAdd);
  }
  catch (error) {
    console.err('Invalid post json:', error)
  }

  const data = new Buffer(postString);
  const t = this;
  UploadUtils.add(data, function(err, res) {
    if (err) {
      console.err('failed to add post', err)
      return
    }
    const postHash = res[0].Hash;

    // save in localstorage
    _selfPosts.unshift(postHash);
    _postInfo[postHash] = postToAdd;
    _allPosts.unshift(postHash);
    // _savePosts();

    // horrible and unsafe
    const toPublish = {
      profile: profile, // Unsafe
      posts: _selfPosts // Unsafe
    }

    UploadUtils.publish(toPublish, function(err, res) {
      if (!err)
        cb(null, res)
      else
        cb(err)
    })
  })
}

function _foundPost(postHash, cb) {
  console.log('found', postHash)

  UploadUtils.cat(postHash, function(err, res) {
    if(err || !res) return console.error(err)

    if(res.readable) {
        // Returned as a stream
        // res.pipe(process.stdout)
        var json = '';
        res.on("data", function(data) {
          json += data
        });
        res.on("end", function() {
          console.log('json', json)
          if (!_postInfo[postHash]) {
            var post;
            try { post = JSON.parse(json); }
            catch (error) { return console.error(err) }
            console.log('adding post', post)
            _postInfo[postHash] = post;
            _allPosts.unshift(postHash)
            if (post.author == ProfileStore.getProfile().id)
              _selfPosts.unshift(postHash)
            // _savePosts();
          }
          cb()
        })
    } else {
        // Returned as a string
        console.log('string', res)
        if (!_postInfo[postHash]) {
          _postInfo[postHash] = post;
          _allPosts.unshift(postHash)
          if (post.author == ProfileStore.getProfile().id)
            _selfPosts.unshift(postHash)
          // _savePosts();
        }
        cb()
    }
  })
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

  get: function(hash) {
    console.log(_postInfo)
    return _postInfo[hash];
  },

  delete(hash) {

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
