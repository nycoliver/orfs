// var PostActionCreators = require('../actions/PostActionCreators');

var React = require('react');
var Link = require('react-router').Link
var SearchBar = require('./SearchBar.react');
var NewPost = require('./NewPost.react');

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
      <nav className="navbar navbar-default navbar-fixed-top">
      <div className="navbar-header">
        <ul className="nav navbar-nav navbar-left">
          <li className="nav-item nav-link">
            <Link to="/"><span className="logo">PLANETARY LINK</span></Link>
          </li>
        </ul>
      </div>

       <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <SearchBar />
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown nav-item nav-link profile-dropdown">
                <a className="username nav-link  dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  {profile.username}
                  <svg aria-hidden="true" className="octicon octicon-triangle-down" fill="#223" width="9" height="12" role="img" version="1.1" viewBox="0 0 12 12">
                    <path d="M0 5l6 6 6-6H0z" />
                  </svg>
                </a>
                <ul className="dropdown-menu">
                  <li><a className = "dropdown-item" href="#">{profile.username}</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a className = "dropdown-item" href="#">{"Profile"}</a></li>
                  <li><a className = "dropdown-item" href="#">{"Following"}</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a className = "dropdown-item" href="#">{"Settings"}</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a className = "dropdown-item" href="#">{"Invite"}</a></li>
                </ul>
              </li>

                <li className="dropdown nav-item nav-link">
                  <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <svg aria-hidden="true" className="octicon octicon-plus" fill="#223" width="12" height="16" role="img" version="1.1" viewBox="0 0 12 12">
                        <path d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"></path>
                    </svg>
                  </a>
                  <ul className="dropdown-menu">
                    <NewPost />
                  </ul>
                </li>
              </ul>
            </div>
      </nav>
    )

//     return (
//       <header className="navbar navbar-dark navbar-fixed-top bd-navbar" role="banner">
//   <div className="clearfix">
//     <button className="navbar-toggler pull-xs-right hidden-sm-up" type="button" data-toggle="collapse" data-target="#bd-main-nav">
//       ☰
//     </button>
//     <div className="hidden-sm-up" href="/">
//       <SearchBar />
//     </div>
//   </div>
//   <div className="collapse navbar-toggleable-xs" id="bd-main-nav">
//     <ul className="nav navbar-nav">
//
//       <li className="nav-item">
//         <SearchBar />
//       </li>
//
//
//       <li className="nav-item pull-xs-right">
//         <a href="#" className="nav-link username">{this.state.profile.username}</a>
//       </li>
//     </ul>
//   </div>
// </header>
//
//     );

  },

  _onChange: function() {
    this.setState(getStateFromStores(this.props.threadID));
  }
})

module.exports = TopBar;
