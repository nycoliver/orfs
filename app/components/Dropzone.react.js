var React = require('react');
var ReactDOM =require('react-dom');

var Textarea = require('react-textarea-autosize');

var AudioPlayer = require('./AudioPlayer.react');
var VideoPlayer = require('./VideoPlayer.react');

var Dropzone = React.createClass({

  propTypes: {
    onDrop: React.PropTypes.func.isRequired,
    // content: React.PropTypes.isRequired,
  },

  open: function() {
    var fileInput = ReactDOM.findDOMNode(this.refs.fileInput);
    fileInput.value = null;
    fileInput.click();
  },

  render: function() {
    console.log("render dropzone", this.props.content)
    var className = this.props.className || 'dropzone';
    var content = this.props.content.map(function(item, index) {
      if (item.type == "text")
        return (
          <Textarea className={"textBox"} key={index}></Textarea>
        )
      if (item.type == "image/jpg"
      || item.type == "image/jpeg"
      || item.type == "image/png")
        return (
          <div className={"draggable-media"} key={index}>
            <img
              className={"image"}
              src={'http://localhost:8080/ipfs/' + item.hash}
              key={index}>
            </img>
          </div>
        )
      if (item.type == "audio/mp3" || item.type == "audio/x-m4a" || "audio/mpeg")
        return (
          <div className={"draggable-media"} key={index}>
            <AudioPlayer
              artwork={item.metadata.artwork}
              title={item.metadata.title}
              artist={item.metadata.artist}
              source={item.hash}
            />
          </div>
        )

      if (item.type == "video/mp4")
        return (
          <div className={"draggable-media"} key={index}>
            <VideoPlayer
              artwork={item.metadata.artwork}
              source={item.hash}
            />
          </div>
        )
    })

    if (content.length == 0)
      return (
        <div className={"dropzone empty"} onDrop={this.props.onDrop}>
        </div>
      )

    return (
      <div className={"dropzone"} onDrop={this.props.onDrop}>
        {content}
      </div>
    )
  }

});

module.exports = Dropzone;
