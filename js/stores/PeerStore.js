var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var PeerUtils = require('../utils/PeerUtils');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _peers = {
  "QmXE8vq2LsEmdHHtb95ujTv2Hfag4qTjk2fehwC8HVXcMn": {} // hardcoded for testing
};

function _processFoundPeers(peers) {
  // See which peers are new
  // Insert into peers
  // Emit new peers event with new peers for PostStore to pick up on
}

function _checkForUpdates(peerid) {
  PeerUtils.getPostsOfPeer(peerid, function(err, res) {

  })
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

  init: function() {
    for (var peer in _peers) {
      _checkForUpdates(peer);
      setInterval(function () {_checkForUpdates(peer)}, 60*1000) // is there a better way??
    };
  },

  getAll: function() {
    return _peers;
  },

  get: function(peerid) {
    return _peers[peerid];
  },

  followPeer: function(peerid) {
    if(!this.get(peerid))
      _peers[peerid] = {}; // add options here in the future?
  },

  unfollowPeer: function(peerid) {
    if(this.get(peerid))
      delete _peers[peerid];
  }

})

PeerStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {

    default:
      // Do nothing.
  }
})

module.exports = PeerStore;
