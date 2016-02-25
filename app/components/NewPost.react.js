var PostActionCreators = require('../actions/PostActionCreators');

var React = require('react');
var Dropzone = require('./Dropzone.react');

//Probably does not conform to flux model
var UploadUtils = require('../utils/UploadUtils');



var NewPost = React.createClass({
  displayName: "NewPost",

  getInitialState: function() {
    return {
      content: [],
      isDragActive: false
    };
  },

  _onDrop: function(event) {
    event.preventDefault();

    // Code from ipfs webui
    var files = event.target.files || event.dataTransfer.files
    var file = files[0];
    var t = this;

    if (file.path) {
      // add(file.path)
    } else {
      const reader = new window.FileReader()
      reader.onload = function() {
        var data = reader.result
        data = new Buffer(data.substr(data.indexOf(',') + 1), 'base64')
        // We need the hash and metadata of the file'
        UploadUtils.uploadFile(data, file.type, function(err, res) {
          if (err) {
            console.log(err)
            return;
          }
          var content = t.state.content;
          content.push({"type": res.type, "hash": res.hash, "metadata": res.metadata});
          t.setState({"content": content});
        });
      }
      // TODO: use array buffers instead of base64 strings
      reader.readAsDataURL(file)
    }
  },


  _post: function(e) {
    var content = this.state.content;
    for (var i = 0; i < content.length; i++) {
      PostActionCreators.createPost(content[i]);
      this.props.close();
    }
  },

  render: function() {
    var style = {
      width: 500,
      height: 100,
      borderStyle: "dashed"
    }

    return(
      <div className={'new-post'}>
        <div className={'back-shadow'}>
          <div className={'new-post box'}>
            <Dropzone content={this.state.content} onDrop={this._onDrop}></Dropzone>
            <button type="button" className="btn btn-primary" onClick={this._post}>Post</button>
            <button type="button" className="btn btn-success">Save Draft</button>
            <button type="button" className="btn btn-danger" onClick={this.props.close}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
})

// <button type="button" className="btn btn-primary">Post</button>
// <button type="button" className="btn btn-secondary">Preview</button>

// <button type="button" className="btn btn-default btn-lg">
//   <span className={"glyphicon glyphicon-star"} aria-hidden={"true"}></span> Star
// </button>

module.exports = NewPost;
