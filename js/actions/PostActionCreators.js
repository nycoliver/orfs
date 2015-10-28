var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  foundPost: function(post) {
    AppDispatcher.dispatch({
      type: ActionTypes.FOUND_POST,
      post: post
    });
  }
  
}
