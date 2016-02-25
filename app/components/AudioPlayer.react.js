var React = require('react');

var Howl = require('howler').Howl;

var AudioPlayer = React.createClass({displayName: "AudioPlayer",
  getInitialState:function() {
    return {
      playing: false,
      paused: true,
      isLoading: false,
      currentSongIndex: -1,
      volume: 1
    };
  },

  _play: function() {
    this.howler.play();
  },

  _pause: function() {
    this.howler.pause();
  },

  _onplay: function() {
  },

  initSoundObject: function() {
		this.clearSoundObject();

		this.howler = new Howl({
			urls: ['http://localhost:8080/ipfs/'+this.props.source],
			volume: this.state.volume,
      onplay: this._onplay,
      format: "mp3"
		});
	},

  clearSoundObject: function() {
 		if (this.howler) {
			this.howler.stop();
			this.howler = null;
		}
 	},


  playAudio: function() {
    if (!this.howler) {
			this.initSoundObject();
		}
    if (!this.state.playing) {
        this._play();
    		this.setState({"playing": true});
  	} else {
    		this.setState({"playing": false});
  			this._pause();
  	}
  },

  render: function() {
    var playOrPause = this.state.playing ? 'pause' : 'play';
    var title = this.props.title;
    if (this.props.artist)
      title = title + " - " + this.props.artist
    return (
      <div className={"audioplayer"} style={{backgroundImage: "url('http://localhost:8080/ipfs/"+this.props.artwork+"')"}}>
        <div className={"title"}>
        <h2>{title}</h2>
        </div>
        <div className={"controls"}>
          <button type="button" className={"play "+playOrPause} onClick={this.playAudio}>
             <span className={"glyphicon glyphicon-" + playOrPause} aria-hidden="true"></span>
          </button>

        </div>
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


module.exports = AudioPlayer;
