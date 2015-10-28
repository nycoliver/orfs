var React = require('react');
var PhotoPost = require('./PhotoPost.react');
var AudioPost = require('./AudioPost.react');
var VideoPost = require('./VideoPost.react');
var NewPost = require('./NewPost.react');

var PostStore = require('../stores/PostStore');

var getStateFromStores = function() {
  return {
    posts: PostStore.getAll()
  }
}

var Feed = React.createClass({
  displayName: "Feed",

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    // this.setState({files: files.files});
  },

  drop: function(files) {
    var file = files[0];
    var t = this;

    if (file.type == "image/jpeg") {
      console.log(file);
    }

    // if (file.type == "audio/mp3") { //or what else?
    //   id3({ file: file.path, type: id3.OPEN_LOCAL }, function(err, tags) {
    //       // tags now contains your ID3 tags
    //       console.log(tags)
    //       if (tags.v2.image.data) {
    //         var arrayBufferView = new Uint8Array( tags.v2.image.data );
    //         var blob = new Blob( [ arrayBufferView ], { type: tags.v2.image.mime } );
    //         var urlCreator = window.URL || window.webkitURL;
    //         var imageUrl = urlCreator.createObjectURL( blob );
    //         console.log("Image url: " + imageUrl)
    //
    //         blobToBase64(blob, function(base64) {})
    //         var data = new Buffer(arrayBufferView, 'base64');
    //         add(data);
    //
    //         metadata['artwork'] = imageUrl
    //         console.log(metadata)
    //       }
    //   });
    // }

    function add (data) {
      ipfs.add(data, function (err, res) {
        if (err || !res) return t.error(err)
        res = res[0]

        var metadata = {
          id: res.Hash,
          name: res.Name || file.name,
          type: file.type,
          size: file.size
        }

        console.log(metadata)

        var nextFiles = (t.state.files || [])
        nextFiles.unshift(metadata)
        t.setState({
          files: nextFiles
        })

        // fs.writeFile('files.json', JSON.stringify(files))
      })
    }

    var reader = new window.FileReader()
    reader.onload = function () {
      var data = reader.result;
      data = new Buffer(data.substr(data.indexOf(',') + 1), 'base64');
      // add(data);
    }
    // TODO: use array buffers instead of base64 strings
    reader.readAsDataURL(file)
  },

  render: function() {
    var files = this.state.posts.map(function(file, index) {
      if (file.type == "image/jpeg") {
        return React.createElement(PhotoPost, {
          author: file.author,
          id: file.id,
          title: file.title,
          caption: file.caption,
          key: index}); // Size, icon, what else?
      }
      else if (file.type == "audio/x-m4a" || file.type == "audio/mp3") {
        return React.createElement(AudioPost, {
          author: file.author,
          id: file.id,
          artwork: file.artwork,
          title: file.title,
          caption: file.caption,
          key: index}); // Size, icon, what else?
      }
      else if (file.type == "video/mp4" || "video/webm") {
        return React.createElement(VideoPost, {
          author: file.author,
          id: file.id,
          title: file.title,
          caption: file.caption,
          key: index}); // Size, icon, what else?
      }
    });

    return (
      React.createElement("div", {className: "stream"},
        React.createElement(NewPost, {onDrop: this.drop}),
        files
      )
    );

  }
})

module.exports = Feed;
