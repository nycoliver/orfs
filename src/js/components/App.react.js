var React = require('react');

var ProfileStore = require('../stores/ProfileStore');

var TopBar = require('./TopBar.react');
var NewPost = require('./NewPost.react');
var Feed = require('./Feed.react');

var App = React.createClass({
  displayName: 'App',

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    return {
      profile: ProfileStore.getProfile()
    }
  },

  componentDidMount() {
    ProfileStore.addChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(this.getStateFromStores());
  },

  _toggleNewPost() {
    this.setState({
      newPost: !this.state.newPost
    })
    this.refs.newPost.clear();
    if (!this.state.newPost)
      this.refs.newPost.focus();
  },

  render() {

    var newPostActive = (this.state.newPost) ? 'active' : 'inactive';

    return (
      <div id="app" className="bg-near-white relative">
        <div id="darken" className={"relative bg-black-30 fixed top-0 bottom-0 left-0 right-0 " + newPostActive}>
          <div id="composer" className={newPostActive}>
            <NewPost ref='newPost' close={this._toggleNewPost} />
          </div>
        </div>
        <TopBar toggleNewPost={this._toggleNewPost}/>
        {this.props.children}
      </div>
    );
  }
})



module.exports = App;
