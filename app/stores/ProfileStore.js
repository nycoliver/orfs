var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

var PeerActionCreators = require('../actions/PeerActionCreators');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';


const conf = localStorage
var _config = JSON.parse(conf.getItem('config'));

const DEFAULT_AVATAR = "QmSNJZF7c1sYY4HXPxnzousGsJ7AfJpE3jaFj4sVFzC5sh"
const DEFAULT_CANOPY = "QmSvHqQa2f6X1ooGBWPzzc6JcdVye1uyMTBsi1hZijUAyq"

if (!_config) {
  _config = {
    profile: {
      id: "",
      username: "",
      avatar: DEFAULT_AVATAR,
      canopy: DEFAULT_CANOPY
    }
  }
  _createBasicProfile();
}

function _createBasicProfile() {
  var profile = {};
  var id = ipfs.id(function(err, res) {
    if (err) {
      console.log(err);
      return
    }
    profile.username = res.ID.substring(2,10);
    profile.id = res.ID;
    profile.avatar = DEFAULT_AVATAR;
    profile.canopy = DEFAULT_CANOPY;
    _config.profile = profile;
    conf.setItem('config', JSON.stringify(_config));
    PeerActionCreators.foundPeer(profile.id, profile);
  })
}

var ProfileStore = assign({}, EventEmitter.prototype, {

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
    return _config.profile
  },

  _createBasicProfile: function() {
    ipfs.id(function(err, res) {
      if (err) {
        console.log(err);
        return
      }
      var id = res.ID,
      shortId = id.substring(2,10);

      _config.profile = {
        id: id,
        username: shortId,
        avatar: DEFAULT_AVATAR
      };

      conf.setItem('config', JSON.stringify(_config));
    })
  }
})

ProfileStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.CREATE_PROFILE:
      var profile = action.profile
      _createProfile(profile, function() {
          ProfileStore.emitChange();
      })
      break;

    default:
      // Do nothing.
  }
})

module.exports = ProfileStore;
