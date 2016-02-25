var React = require('react');

var Avatar = require('./Avatar.react');
var Posts = require('./Posts.react');

var ProfileStore = require('../stores/ProfileStore');

var Profile = React.createClass({
  displayName: 'Profile',


  render: function render() {
    // make this getProfile(id)
    var profile = ProfileStore.getProfile();
    if (!profile)
      return;
    var shortId = profile.id.substring(2,10);
    var canopyUrl = "url('http://localhost:8080/ipfs/" + profile.canopy + "')";
    console.log(canopyUrl)
    return (
      <div className="profile">
        <div className="userinfo" style={{backgroundImage: canopyUrl}}>
          <ul>
            <li><Avatar image={profile.avatar} /></li>
            <li className={"name-and-key"}>
              <div className={"username"}>
                <h1>{profile.username}</h1>
              </div>
              <h2 className={"fingerprint"}>@{shortId}</h2>
            </li>
            <li className={"follow"}>
              <button type="button" className="btn btn-follow">FOLLOW</button>
            </li>
          </ul>
        </div>

        <Posts user={profile.id} />
      </div>
    );
  }

})

// <div className="canopy" src="static/img/canopy.png"></div>


module.exports = Profile;
