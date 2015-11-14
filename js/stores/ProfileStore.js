var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _profile = {
  "id": "QmXE8vq2LsEmdHHtb95ujTv2Hfag4qTjk2fehwC8HVXcMn",
  "username": "ikeafurniture",
  "avatar": "QmVr51H66mr7htq691ur7m4gFmpEdRbqLNoxv5omrBPiLD"
}

var ProfileStore = assign({}, EventEmitter.prototype, {

  init: function() {

  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getProfile: function() {
    return _profile;
  },

})

module.exports = ProfileStore;
