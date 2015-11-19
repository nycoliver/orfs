// var PostActionCreators = require('../actions/PostActionCreators');

var React = require('react');
var SearchBar = require('./SearchBar.react');

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
        <SearchBar />
      </div>
    );

  },

  _onChange: function() {
    this.setState(getStateFromStores(this.props.threadID));
  }
})

module.exports = TopBar;
