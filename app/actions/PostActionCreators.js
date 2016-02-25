var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

	createPost: function(post) {
		AppDispatcher.dispatch({
			type: ActionTypes.CREATE_POST,
			post: post
		})
	},

  foundPost: function(post) {
    AppDispatcher.dispatch({
      type: ActionTypes.FOUND_POST,
      post: post
    });
  },

	deletePost: function(post) {
    AppDispatcher.dispatch({
      type: ActionTypes.DELETE_POST,
      post: post
    });
  },

	pinPost: function(post) {
    AppDispatcher.dispatch({
      type: ActionTypes.PIN_POST,
      post: post
    });
  },

	repostPost: function(post) {
    AppDispatcher.dispatch({
      type: ActionTypes.PIN_POST,
      post: post
    });
  }

}
