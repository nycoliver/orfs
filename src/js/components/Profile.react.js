var React = require('react');

var Avatar = require('./Avatar.react');

var PeerStore = require('../stores/PeerStore');

var Profile = React.createClass({
  displayName: 'Profile',

  componentWillMount() {
    var peer = PeerStore.getPeer(this.props.params.id);
    if (peer) {
      if (peer.username)
        document.title = peer.username + " - Planetary Link"
      else
        document.title = "@" + peer.id.substring(2,10) + " - Planetary Link"
    }
    else
      document.title = "@" + this.props.params.id.substring(2,10) + " - Planetary Link"
  },

  render() {
    var peer = PeerStore.getPeer(this.props.params.id);
    if (!peer)
      return (
        <div id="profile" className="h-100">
          <div id="error" className={'mh2 h-100 w-100 mw7 center'}>
            <p className="tc">Could not find peer @{this.props.params.id}</p>
          </div>
        </div>
      );

    var shortId = peer.id.substring(2,18);
    var canopyUrl = "url('http://localhost:8080/ipfs/" + peer.canopy + "')";
    return (
      <div id="profile" className="h-100 center overflow-hidden pt5 w-100">
        <div id="userinfo" className={'mh2 h-100 w-100 mw5 center'}>
          <div className="w4 h4 br3 ma0 overflow-hidden center">
            <Avatar image={peer.avatar} />
          </div>
          <div className="center mt2">
            <p id="username" className={"f3 fw6 tc ma0 fl center v-btm"}>
              {peer.username}
            </p>
            <svg className="pl3 fl" fill="#408" viewBox="0 0 16 16" height="28" width="28" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.67 7.06l-1.08-1.34c-0.17-0.22-0.28-0.48-0.31-0.77l-0.19-1.7c-0.08-0.7-0.63-1.25-1.33-1.33l-1.7-0.19c-0.3-0.03-0.56-0.16-0.78-0.33l-1.34-1.08c-0.55-0.44-1.33-0.44-1.88 0l-1.34 1.08c-0.22 0.17-0.48 0.28-0.77 0.31l-1.7 0.19c-0.7 0.08-1.25 0.63-1.33 1.33l-0.19 1.7c-0.03 0.3-0.16 0.56-0.33 0.78l-1.08 1.34c-0.44 0.55-0.44 1.33 0 1.88l1.08 1.34c0.17 0.22 0.28 0.48 0.31 0.77l0.19 1.7c0.08 0.7 0.63 1.25 1.33 1.33l1.7 0.19c0.3 0.03 0.56 0.16 0.78 0.33l1.34 1.08c0.55 0.44 1.33 0.44 1.88 0l1.34-1.08c0.22-0.17 0.48-0.28 0.77-0.31l1.7-0.19c0.7-0.08 1.25-0.63 1.33-1.33l0.19-1.7c0.03-0.3 0.16-0.56 0.33-0.78l1.08-1.34c0.44-0.55 0.44-1.33 0-1.88zM6.5 12L3 8.5l1.5-1.5 2 2 5-5 1.5 1.55-6.5 6.45z"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }

})

// <div className="canopy" src="static/img/canopy.png"></div>


module.exports = Profile;
