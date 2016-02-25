var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;

module.exports = {

	createProfile: function(profile) {
		AppDispatcher.dispatch({
			type: ActionTypes.CREATE_PROFILE,
			profile: profile
		})
  }

}
