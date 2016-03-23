// var PostActionCreators = require('../actions/PostActionCreators');

var React = require('react');
var Link = require('react-router').Link
var NewPost = require('./NewPost.react');

var Avatar = require('./Avatar.react')


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
      <header id="top-bar" className="w-100 pv2 ph3 bg-near-white-s">
        <div className="dt w-100">
          <div className="dtc v-mid tl w-50 ml3">
            <Link to={"/"} className="nowrap dib f5 f5 link" title="Home">
              <p id="logo" className="ttu tracked v-btm f5 fw6 di">Planetary Link</p>
              <p className=" f6 fw6 di ml2 black-30 di">0.0.1</p>
            </Link>
          </div>
          <div className="db dtc v-mid w-100 tr" onClick={this.props.toggleNewPost}>
            <a id="new-post-icon" className="f6 fw6 b  link bg--black-70 dib mh2">
              <div className="dib w2 h2 fl">
                  <svg
                    className="w1 ma2 h1 "
                    viewBox="0 0 12 16"
                    height="16"
                    width="10"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z" />
                  </svg>
              </div>
            </a>
            <a href="#" className="f6 fw6 b  link bg--black-70 dib mh2">
              <div className="w2 h2 fl ma0 br2 overflow-hidden">
                <Avatar image={profile.avatar} />
              </div>
              <div className="w1 h2 fl br3">
                <svg className="mw2 ml1 h-100 " viewBox="0 0 12 16" height="16" width="10" fill="#223" role="img" version="1.1">
                  <path d="M0 5l6 6 6-6H0z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </header>
    )

  },

  _onChange: function() {
    this.setState(getStateFromStores(this.props.threadID));
  }
})

module.exports = TopBar;
