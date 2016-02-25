var React = require('react');

var VideoPlayer = React.createClass({displayName: "VideoPlayer",
  getInitialState:function() {
    return {
      playing: false,
      paused: true,
      isLoading: false,
    };
  },

  render: function() {
    var playOrPause = this.state.playing ? 'pause' : 'play';
    return (
      <div className={"videoplayer"} style={{backgroundImage: "url('http://localhost:8080/ipfs/"+this.props.artwork+"')"}}>
        <video src={'http://localhost:8080/ipfs/' + this.props.source} controls={true}></video>
      </div>
    )
  }
})

// <div className={"metadata"}>
//   <a className={"title"}><h3>{this.props.title}</h3></a>
//   <a className={"artist"}><h3>{this.props.artist}</h3></a>
//   <a className={"album"}><h3>{this.props.album}</h3></a>
//   <h3 className={"year"}>{this.props.year}</h3>
// </div>

// <audio src={'http://localhost:8080/ipfs/' + this.props.id} controls={true}></audio>


module.exports = VideoPlayer;
