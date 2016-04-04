var PostActionCreators = require('../actions/PostActionCreators');

var UploadUtils = require('../utils/UploadUtils');

var React = require('react');
var Editor = require('./Editor.react');

import http from 'http';

var NewPost = React.createClass({
  displayName: "NewPost",

  getInitialState() {
    return {content: [], isDragActive: false};
  },

  _onDrop(event) {
    var files = event.target.files || event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      this.refs.editor._insertMedia(files[i])
    }
  },

  publish(e) {
    const content = this.refs.editor._exportJSON();

    let post = {
      content: [],
      tags: []
    };

    let added = 0;
    for (var i = 0; i < content.length; i++) {
      console.log(i, content.length, item)

      let item = content[i];
      if (item.type == "text/plain") {
        // remove leading or trailing whitespace
        if ((item.data == '' && i == 0) || (item.data == '' && i == content.length-1)) {
          added++;
        }
        else {
          var data = new Buffer(item.data);
          // kinda hacky :(
          var t = this;
          t.PostActionCreators = PostActionCreators;
          UploadUtils.add(data, function(err, res) {
            post.content.push({type: item.type, hash: res[0].Hash})
            if (added++ == content.length - 1) {
              t.PostActionCreators.createPost(post);
              t.close();
            }
          })
        }
      }

      else if (item.type == "text/markdown") {
        console.log("markdown not yet supported");
      }

      else if (item.type == "image/jpeg" || item.type == "image/jpg" || item.type == "image/jpeg" || item.type == "image/png" || item.type == "image/gif") {
        const reader = new window.FileReader()
        reader.onload = () => {
          let data = reader.result
          data = new Buffer(data.substr(data.indexOf(',') + 1), 'base64')
          var t = this;
          t.PostActionCreators = PostActionCreators;
          UploadUtils.add(data, function(err, res) {
            post.content.push({type: item.type, hash: res[0].Hash})
            if (added++ == content.length - 1) {
              t.PostActionCreators.createPost(post);
              t.close();
            }
          })
        }
        // TODO: use array buffers instead of base64 strings
        reader.readAsDataURL(item.file)
      }
    }
  },

  close() {
    // setTimeout(function() {this.close}, 1000);
    this.props.close();
  },

  clear() {
    this.refs.editor.clear();
  },

  focus() {
    this.refs.editor.focus();
  },

  render() {
    var style = {
      width: 500,
      height: 100,
      borderStyle: "dashed"
    }

    return (
      <div id="new-post" className="w-100 center">
        <div id="editor" onDrop={this._onDrop} className='mt5 w-100 relative f6  bw1  bg-near-white br2 overflow-hidden'>
          <Editor ref="editor"/>
          <svg className="h1 ml2 mb2 bottom-0 absolute" height="16" width="14" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.73 2.73c-0.47-0.47-1.11-0.73-1.77-0.73H2.5C1.13 2 0 3.13 0 4.5v2.47c0 0.66 0.27 1.3 0.73 1.77l6.06 6.06c0.39 0.39 1.02 0.39 1.41 0l4.59-4.59c0.39-0.39 0.39-1.02 0-1.41L6.73 2.73zM1.38 8.09c-0.31-0.3-0.47-0.7-0.47-1.13V4.5c0-0.88 0.72-1.59 1.59-1.59h2.47c0.42 0 0.83 0.16 1.13 0.47l6.14 6.13-4.73 4.73L1.38 8.09z m0.63-4.09h2v2H2V4z"/>
          </svg>
          <input className="ml4 w-100  mb2 bg-near-white b--none"></input>
        </div>
        <div id='buttons' className='h3 mw5 mr6 mt3 ml6 center'>
          <button id="publish" className="btn ml3 fr" onClick={this.publish}>
            Publish
          </button>
          <button id="close" className="btn fr" onClick={this.close}>Close</button>
        </div>
      </div>
    )
  }
})

module.exports = NewPost;
