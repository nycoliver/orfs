// var PostActionCreators = require('../actions/PostActionCreators');

var React = require('react');

var ProfileStore = require('../stores/ProfileStore');

var getStateFromStores = function() {
  return {
    profile: ProfileStore.getProfile()
  }
}

var TopBar = React.createClass({
  displayName: "TopBar",

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    ProfileStore.addChangeListener(this._onChange);
  },

  render: function() {
    var profile = this.state.profile;

    return (
      <div className="top-bar">
        <div className="search">
          <form className="navbar-form" role="search">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search for people or posts...">
              </input>
            </div>
          </form>
        </div>
      </div>
    );

  },

  _onChange: function() {
    this.setState(getStateFromStores(this.props.threadID));
  }
})

module.exports = TopBar;
