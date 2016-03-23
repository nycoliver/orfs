var React = require('react');
var moment = require('moment')

var AudioPlayer = React.createClass({

  displayName: "AudioPlayer",

  propTypes: {
    src: React.PropTypes.string.isRequired,
    preload: React.PropTypes.string,
    mimeType: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      preload: 'metadata',
      mimeType: 'audio/mp3',
      duration: 20
    }
  },

  getInitialState() {
    return {
      playing: false,
      canPlay: false,
      seeking: false,
      currentTime: 0,
      remainingTime: 0
    }
  },

  componentDidMount() {
    var playerElement = this.refs.player;
    if(this.props.preload === 'none') {
      this.audioReady();
    } else if(playerElement.readyState > 3) {
      this.audioReady();
    } else {
      playerElement.addEventListener('canplay', this.audioReady);
    }
    playerElement.addEventListener('ended', this.audioEnded);
    playerElement.addEventListener('timeupdate', this.audioUpdate);
    playerElement.addEventListener('pause', this.audioPause);
    playerElement.addEventListener('loadedmetadata', this.audioUpdate);
  },

  componentWillReceiveProps: function(nextProps) {
    if(this.props.src !== nextProps.src) {
      this.audioPause();
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(prevProps.src !== this.props.src) {
      this.audioLoad();
      // this.audioPlay();
    }
  },

  audioLoad: function() {
    this.refs.player.load();
    this.setState({
      lt:7.6,
      rt:0,
      playing: false,
      canPlay: false
    });
  },

  audioUpdate: function() {
    var playerElement = this.refs.player;
    var currentTime = playerElement.currentTime;
    var remainingTime = playerElement.duration - playerElement.currentTime;
    this.setState({
      currentTime: currentTime,
      remainingTime: remainingTime
    });
  },

  audioReady: function() {
    this.setState({
      canPlay: true
    });
  },

  audioEnded: function() {
    this.setState({
      playing: false
    });
  },

  audioPlay() {
    var playerElement = this.refs.player;
    try {
      var audioElements = document.getElementsByTagName('audio');
      for(var i = 0; i < audioElements.length; i++) {
        audioElements[i].pause();
      }
    } catch(e) {}
    this.refs.player.play();
    this.setState({
      playing: true
    });
  },

  audioPause() {
    this.refs.player.pause();
    this.setState({
      playing: false
    });
  },

  togglePlayPause: function() {
    if(this.state.canPlay) {
      (this.state.playing) ? this.audioPause() : this.audioPlay();
    }
  },

  seek(time) {

  },

  render() {
    var artwork = "url('http://localhost:8080/ipfs/" + this.props.artwork + "')";
    var duration = moment().startOf('day')
        .seconds(this.props.duration)
        .format('m:ss');; // should be a prop
    return (
      <figure id="audioplayer" className={"ma0"}>
        <audio ref="player" preload={this.props.preload}>
          <source src={this.props.src} type={this.props.mimeType} />
        </audio>
        <div
          id="artwork"
          className="w-100 h5 bg-cv relative"
          style={{backgroundImage: artwork}}
          onClick={this.togglePlayPause}>
          <div id="position" className="h1 bottom-0 absolute w-100 di">
            <div id="remaining" className="h1 ma1 bg-black-50 br1 ph1 bottom-0 right-0 absolute">
              <p id='time-tag' className="f6 fw5 ma0 v-top white">
                {duration}
              </p>
            </div>
              <div id="progress">

              </div>
          </div>
        </div>
      </figure>
    )
  }
})

// <figcaption>
//   <div className="info">
//     <span itemProp="title">
//       {this.props.title}
//     </span>
//     <span itemProp="artist">
//       {this.props.artist}
//     </span>
//   </div>
// </figcaption>

module.exports = AudioPlayer;
