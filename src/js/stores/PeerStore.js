var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var PeerUtils = require('../utils/PeerUtils');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var ProfileStore = require('../stores/ProfileStore');
var profile = ProfileStore.getProfile();


const conf = localStorage;
var _peers = JSON.parse(conf.getItem('peers')) || {
  following: [],
  known: {}
};


// there is a better way
// IPFS is working on pubsub
for (var p in _peers.following) {
  var peerid = _peers.following[p];
  _checkForUpdatesRecursively(peerid);
};

function _checkForUpdatesRecursively(peerid) {
  console.log("fetching posts of", peerid)
  PeerUtils.getPostsOfPeer(peerid, function(err, res) {
    setTimeout(function() {
      _checkForUpdatesRecursively(peer.id)
    }, 20 * 1000)
  })
}

// _checkSwarm();

// function _checkSwarm() {
//   PeerUtils.getSwarm(function(err, res) {
//     if (err || !res || !res.Strings) {
//       console.log(err)
//       return
//     }
//     var peers = res.Strings;
//     for (var i = 0; i < peers.length; i++) {
//       var peer = peers[i];
//       var peerid = peer.split('/')[6];
//       if (!_peers.known[peerid])
//         PeerUtils.getPeerInfo(peerid);
//     }
//   });
// }

function _foundPeer(peerid, profile, cb) {
  _peers.known[peerid] = {
    "username": profile.username,
    "id": peerid,
    "avatar": profile.avatar,
    "status": "known"
  };
  PeerUtils.getPostsOfPeer(peerid);
  conf.setItem('peers', JSON.stringify(_peers));
  cb();
}

function _followPeer(peerid, cb) {
  var peer = _peers.known[peerid];
  if (peer.status == "unknown" || _peers.following[peerid])
    return;
  _checkForUpdatesRecursively(peer.id);
  _peers.following.push(peer);
  conf.setItem('peers', JSON.stringify(_peers));
  cb()
}

var PeerStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _peers.known;
  },

  getPeer: function(peerid) {
    return _peers.known[peerid];
  },

  getInfo: function(peerid) {
    if (!_peers.known[peerid]) {
      _peers.known[peerid] = {
        "status": "unknown",
        "username": peerid,
      }
      PeerUtils.getPeerInfo(peerid)
    }

    return _peers.known[peerid]
  },

})

PeerStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.type) {
    case ActionTypes.FOUND_PEER:
      var peer = action.peer;
      var profile = action.profile;
      _foundPeer(peer, profile, function() {
        PeerStore.emitChange();
      })
      break;

    case ActionTypes.FOLLOW_PEER:
      var peer = action.peer;
      _followPeer(peer, function() {
        PeerStore.emitChange();
      })
      break;

    default:
      // Do nothing.
  }
})

module.exports = PeerStore;
