// var PostActionCreators = require('../actions/PostActionCreators');

var React = require('react');
var Link = require('react-router').Link
var NewPost = require('./NewPost.react');
var Search =require('./Search.react');

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

  toggleSearch() {

  },

  toggleUserMenu: function() {
    this.setState({
      showUserMenu: !this.state.showUserMenu
    })
  },

  render: function() {
    var profile = this.state.profile;
    var userMenu;

    if (this.state.showUserMenu)
      userMenu =
      <div id="userDropdown" className="absolute right-0 ma3 bg-white pa3 br2 ba">
        <ul className="list pl0 mv0 tl">
          <li className="mid-gray">
            {// <p className="ma0">Signed in as</p>
          }
            <p className="mv0 b">{profile.username}</p>

          </li>
          <li>
            <p className="mv3">Profile</p>
          </li>
          <li>
            <p className="mv3">Pinned</p>
          </li>
          <li>
            <p className="mb0">Settings</p>
          </li>
        </ul>
      </div>

    return (
      <header id="top-bar" className="w-100 pv2 ph3 bg-near-white-s">
        <div className="dt w-100">
          <div className="dtc v-mid tl w5 ml3">
            <Link to={"/"} className="nowrap dib f5 f5 link" title="Home">
              <p id="logo" className="ttu tracked v-btm f5 fw6 di">Planetary Link</p>
              <p className=" f6 fw6 di ml2 black-30 di">0.0.1</p>
            </Link>
          </div>
          <div className="db dtc v-mid w5 tr">
            <div id="search" className="f6 fw6 b link bg--black-70 dib mr2" onClick={this.toggleSearch}>
              <div className="dib w2 h2 fl">
                <svg
                  className="w1 ma2 h1 "
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.7 14.3L11.89 10.47c0.7-0.98 1.11-2.17 1.11-3.47 0-3.31-2.69-6-6-6S1 3.69 1 7s2.69 6 6 6c1.3 0 2.48-0.41 3.47-1.11l3.83 3.81c0.19 0.2 0.45 0.3 0.7 0.3s0.52-0.09 0.7-0.3c0.39-0.39 0.39-1.02 0-1.41zM7 11.7c-2.59 0-4.7-2.11-4.7-4.7s2.11-4.7 4.7-4.7 4.7 2.11 4.7 4.7-2.11 4.7-4.7 4.7z" />
                </svg>
              </div>
            </div>
            <div id="new-post-icon" className="f6 fw6 b  link bg--black-70 dib mr2" onClick={this.props.toggleNewPost}>
              <div className="dib w2 h2 fl">
                  <svg
                    className="w1 ma2 h1 "
                    viewBox="0 0 12 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z" />
                  </svg>
              </div>
            </div>
            <div id="showUserMenu" href="#" className="f6 fw6 b link bg--black-70 dib ml2" onClick={this.toggleUserMenu}>
              <div className="w2 h2 fl ma0 br2 overflow-hidden">
                <Avatar image={profile.avatar} />
              </div>
              <div className="w1 h2 fl br3">
                <svg className="mw2 ml1 h-100 " viewBox="0 0 12 16" height="16" width="10" fill="#223" role="img" version="1.1">
                  <path d="M0 5l6 6 6-6H0z" />
                </svg>
              </div>
            </div>
            {userMenu}
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
