var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var UploadUtils = require('../utils/UploadUtils');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';


// Change this to object so individual posts can be accessed
var _posts = {};

function _processFoundPosts(posts) {
  // See which posts are new
  // Insert into posts
  // Emit new posts event with new posts
}

function _createPost(post, cb) {
  UploadUtils.add(post.path, function(err, res) {

    var postToAdd = {
      "author": "ikeafurniture", // WARNING get rid of hardcode
      "id": res[0].Hash, // WARNING What if it's not [0] -- get length from res.length
      "name": post.name, // Or should it be res.name??
      "type": post.type,
      "size": post.size
    }

    // Just make this UploadUtils.uploadAudio or something
    if (post.type == "audio/mp3" || post.type == "audio/x-m4a") {
      UploadUtils.getArtwork(post, function(err, artwork) {
        UploadUtils.add(artwork, function(err, artres) {
          postToAdd.artwork = artres[0].Hash;
          // factor this out to another function newPost or something
          // on events found/new_post
          _posts[postToAdd.id] = postToAdd;
          UploadUtils.publish(_posts, function(err, res) {
            console.log("publish: ", err, res);
          })
          cb()
        })
      });
    }

    else {
      // factor this out to another function newPost or something
      // on events found/new_post
      _posts[postToAdd.id] = postToAdd;
      cb()
    }

  })
}

function _foundPost(post, cb) {
  if (!PostStore.get(post.id)) {
    _posts[post.id] = post;
    cb()
  }
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
    return _posts;
  },

  get: function(id) {
    return _posts[id];
  }

})

PostStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
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
