var React = require('react');
var moment = require('moment');

var Link = require('react-router').Link

var AudioPlayer = require('./AudioPlayer.react')
var Avatar = require('./Avatar.react');

var AudioPost = React.createClass({displayName: "Post",
  render: function() {
    var dateString = moment.unix(this.props.date).format("ddd, hA");

    var content;


    if (this.props.type == "audio/mp3")
      content = <AudioPlayer
        artwork={this.props.artwork}
        source={this.props.id}
        title={this.props.title}
        artist={this.props.artist} />

    else if (this.props.type == "image/jpg"
    || this.props.type == "image/jpeg"
    || this.props.type == "image/gif"
    || this.props.type == "image/png")
      content = <img src={'http://localhost:8080/ipfs/' + this.props.id}></img>

    // else
    //   content = <File
    //     source={this.props.id}
    //     title={this.props.title}
    //     size={this.props.size} />

    return (
      <div className="post">
        <div className={'author'}>
          <Avatar image={this.props.avatar} />
          <Link to={"/user/"+this.props.author}>
            <h1 className={"username"}>{this.props.username}</h1>
          </Link>
          <h2 className={"date"}>{dateString}</h2>
        </div>
        <div className={"content"}>
          {content}
        </div>
      </div>

    )
  }
})

// <ul>
//   <li><span className={"glyphicon glyphicon-trash"} aria-hidden={"true"}></span></li>
//   <li><span className={"glyphicon glyphicon-pushpin"} aria-hidden={"true"}></span></li>
//   <li><span className={"glyphicon glyphicon-retweet"} aria-hidden={"true"}></span></li>
// </ul>

// <div className={"metadata"}>
//   <a className={"title"}>{this.props.title}</a><br/>
// <a className={"artist"}>{this.props.artist}</a><br/>
// <a className={"album"}>{this.props.album} ({this.props.year})</a>
// <ul>
//   <li><a className={"tag"}>1990s, </a></li>
//   <li><a className={"tag"}>hip.hop, </a></li>
//   <li><a className={"tag"}>new.york.city</a></li>
// </ul>
// <ul>
//   <li><a className={"tag"}>Original Release / </a></li>
//   <li><a className={"tag"}>Chrysalis / </a></li>
//   <li><a className={"tag"}>CD</a></li>
// </ul>
// <ul>
//   <li><a className={"tag"}>FLAC / </a></li>
//   <li><a className={"tag"}>Lossless / </a></li>
//   <li><a className={"tag"}>Log (100%) / </a></li>
//   <li><a className={"tag"}>Cue</a></li>
// </ul>
// </div>

// <audio src={'http://localhost:8080/ipfs/' + this.props.id} controls={true}></audio>


module.exports = AudioPost;
