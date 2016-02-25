var React = require('react');

var ProfileStore = require('../stores/ProfileStore');

var TopBar = require('./TopBar.react');
var NewPost = require('./NewPost.react');
var Feed = require('./Feed.react');

var App = React.createClass({
  displayName: 'App',

  getStateFromStores: function() {
    return {
      profile: ProfileStore.getProfile()
    }
  },

  getInitialState: function() {
    var state = this.getStateFromStores();
    state.isDragActive = false;
    return state;
  },

  componentDidMount: function() {
    ProfileStore.addChangeListener(this._onChange);
  },

  _onDragEnter: function() {
  if (!this.state.isDragActive)
    this.setState({isDragActive: true});
  },

  _onDragLeave: function() {
  if (this.state.isDragActive)
    this.setState({isDragActive: false});
  },

  _closeNewPost: function() {
  if (this.state.isDragActive)
    this.setState({isDragActive: false});
  },

  _onProfileSave: function() {

  },

  _onChange: function() {
    this.setState(this.getStateFromStores());
  },

  render: function render() {

    var newPost;
    if (this.state.isDragActive)
      newPost = <NewPost close={this._closeNewPost}/>;

    return (
      <div id="app" onDragEnter={this._onDragEnter} onDragExit={this._onDragLeave}>
        {newPost}
        <TopBar />
        {this.props.children}
      </div>
    );
  }

})


  // <Profile profile={this.state.profile}/>


module.exports = App;
