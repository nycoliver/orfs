var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var PeerUtils = require('../utils/PeerUtils');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _peers = {};

function _processFoundPeers(peers) {
  // See which peers are new
  // Insert into peers
  // Emit new peers event with new peers for PostStore to pick up on
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

  },

  getAll: function() {
    return _peers;
  },

  get: function(id) {
    return _peers[id];
  }

})

PeerStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {

    default:
      // Do nothing.
  }
})

module.exports = PeerStore;
