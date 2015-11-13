var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var UploadUtils = require('../utils/UploadUtils');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _posts = [ { "artwork" : "QmfCSdrAvg7ng1ETAqvYNGkhnGUNE89V2W2WSMoxVa6qAK",
      "author" : "ikeafurniture",
      "id" : "QmbeE7NX1oUShzSfMXxP3WYdnNJHNAPMjD8k8MdFHRC9TF",
      "name" : "08 Jo.mp3",
      "size" : 5476406,
      "type" : "audio/mp3"
    },
    { "author" : "ikeafurniture",
      "id" : "QmSpThVxDomSEGgCNUX4XaXUdawix4YvgBtB3KBYjynDEX",
      "name" : "11jteu0.jpg",
      "size" : 103425,
      "type" : "image/jpeg"
    },
    { "author" : "ikeafurniture",
      "id" : "QmV6RmkZWkRX8utdtyqPHPYk731Th3jCveu4CsCvEw8q7P",
      "name" : "asdf1.jpg",
      "size" : 48465,
      "type" : "image/jpeg"
    },
    { "author" : "ikeafurniture",
      "id" : "QmcwU5VKEtAticCnMFNBEgXFakmMYhjMzv41z13uBNK65N",
      "name" : "asdf2.jpg",
      "size" : 6473015,
      "type" : "image/jpeg"
    },
    { "author" : "ikeafurniture",
      "id" : "QmTTiEYuoWDUeSrTCrvaS8Gk4q5jghcAkSavZtK6MFJUTp",
      "name" : "asdf3.jpg",
      "size" : 350989,
      "type" : "image/jpeg"
    },
    { "author" : "ikeafurniture",
      "id" : "QmUCNPr7MRkY71VJkXbd32Bw2QEJgTocn2VNChDgfxhwSj",
      "name" : "View_of_Woolworth_Building_fixed_crop.jpg",
      "size" : 1112466,
      "type" : "image/jpeg"
    }
  ];

function _processFoundPosts(posts) {
  // See which posts are new
  // Insert into posts
  // Emit new posts event with new posts
}

function _createPost(post, cb) {
  UploadUtils.add(post.path, function(err, res) {
    console.log("!!!!!!!!!!!!");
    console.log(post);
    console.log(err, res);
    post = {
      "author": "ikeafurniture", // WARNING get rid of hardcode
      "id": res[0].Hash, // WARNING What if it's not [0]
      "name": post.name, // Or should it be res.name??
      "type": post.type,
      "size": post.size
    }
    _posts.unshift(post);
    cb()
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
      break;

    default:
      // Do nothing.
  }
})

module.exports = PostStore;
