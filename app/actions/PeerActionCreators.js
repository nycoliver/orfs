var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  foundPeer: function(peer, profile) {
    AppDispatcher.dispatch({
      type: ActionTypes.FOUND_PEER,
      peer: peer,
      profile: profile
    });
  },

  followPeer: function(peer) {
    AppDispatcher.dispatch({
      type: ActionTypes.FOLLOW_PEER,
      peer: peer
    });
  }

}
