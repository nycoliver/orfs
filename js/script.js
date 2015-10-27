var ipfs_api = require('ipfs-api');
var ipfs = ipfs_api('localhost', '5001');
var fs = require('fs');
var id3 = require('id3js');
var alac = require('alac');
var restify = require('restify');
var request = require('request');

var cjdnsAdmin = require('cjdns-admin'),
    admin,
    channel;


var config = require('./config.json');

// create a new Admin
admin = cjdnsAdmin.createAdmin(config.cjdnsAdmin);





var knownPeers = {};

function getInfoOfPeer(peerIp) {
  request("http://["+peerIp+"]:5002/profile", function(err, res, body) {
    if (err)
      console.log(err)
    else {
      console.log(body);
    }
  })
}



// create a response handler
function peersResponse (res) {
    // process ping response


    console.dir(JSON.stringify(res.data.routingTable, null, 4));

    for (var i=0; i<res.data.routingTable.length; i++) {
      var peer = res.data.routingTable[i];
      knownPeers[peer.ip] = peer;
      knownPeers[peer.ip].lastSeen = new Date();

      getInfoOfPeer(peer.ip);
    }

    console.log(JSON.stringify(knownPeers, null, 4));

    if (res.data && res.data.more)
      dumpPeers(res.args.page+1)
}

function dumpPeers(page) {
  // ping the admin
  channel = admin.nodeStore.dumpTable({
      page: page
  });

  // handle the response
  admin.on(channel, peersResponse);
}

dumpPeers(0)
setInterval(function(){dumpPeers(0)}, 60*1000)








window.$ = window.jQuery = require('./js/jquery-2.1.4.min.js');


var files;
var exists = fs.existsSync('./files.json');
if (exists) {
  files = require('./files.json');
}

var profile = config.profile;

/** PUBLIC API **/
var server = restify.createServer();
server.get('/profile', sendProfile);

function sendProfile(req, res, next) {
  res.send(profile);
}

server.listen(5002);



var App = React.createClass({
  displayName: 'App',

  render: function render() {
    return (
      React.createElement("div", null,
        React.createElement("div", {id: "graph"}),
        React.createElement("img", {id: "logo", src: "./img/logo.png"}),
        React.createElement(Stream, null),
        React.createElement(GraphMenu, null)
      )
    );
  }
})

var Stream = React.createClass({
  displayName: "Stream",

  getInitialState: function() {
    return {files: []};
  },

  componentDidMount: function() {
    this.setState({files: files.files});
  },

  drop: function(files) {
    var file = files[0];
    var t = this;

    if (file.type == "audio/mp3") { //or what else?
      id3({ file: file.path, type: id3.OPEN_LOCAL }, function(err, tags) {
          // tags now contains your ID3 tags
          console.log(tags)
          if (tags.v2.image.data) {
            var arrayBufferView = new Uint8Array( tags.v2.image.data );
            var blob = new Blob( [ arrayBufferView ], { type: tags.v2.image.mime } );
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL( blob );
            console.log(imageUrl)

            blobToBase64(blob, function(base64) {})
            var data = new Buffer(arrayBufferView, 'base64');
            add(data);

            metadata['artwork'] = imageUrl
            console.log(metadata)
          }
      });
    }

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

        fs.writeFile('files.json', JSON.stringify(files))
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
    var files = this.state.files.map(function(file, index) {
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

var NewPost = React.createClass({
  displayName: "NewPost",

  render: function() {
    var style = {
      width: 500,
      height: 100,
      borderStyle: "dashed"
    }

    return(
    React.createElement("div", {className: "post"},
      React.createElement("img", {id: "avatar", src: 'http://localhost:8080/ipfs/' + profile.avatar}),
      React.createElement(Dropzone, {onDrop: this.props.onDrop, style: style}, null)
    )
  )
  }
})

// Make a general post class then embed the specific post inside

var PhotoPost = React.createClass({displayName: "PhotoPost",
  render: function() {
    return (

      React.createElement("div", {className: "post"},
        React.createElement("img", {id: "avatar", src: 'http://localhost:8080/ipfs/' + profile.avatar}),
        React.createElement("div", {className: "content"},
          React.createElement("div", {className: "header"},
            React.createElement("span", null, this.props.author)
          ),
          React.createElement("img", {src: 'http://localhost:8080/ipfs/' + this.props.id}),
          React.createElement("div", {className: "footer"},
            React.createElement("span", null, this.props.caption,
              React.createElement("span", {className: "glyphicon glyphicon-star", ariaHidden: "true"})
            )
          )
        )
      )
    )
  }
})

var VideoPost = React.createClass({displayName: "VideoPost",
  render: function() {
    return (

      React.createElement("div", {className: "post"},
        React.createElement("img", {id: "avatar", src: 'http://localhost:8080/ipfs/' + profile.avatar}),
        React.createElement("div", {className: "content"},
          React.createElement("div", {className: "header"},
            React.createElement("span", null, this.props.author)
          ),
          React.createElement("video", {src: 'http://localhost:8080/ipfs/' + this.props.id, controls: true}),
          React.createElement("div", {className: "footer"},
            React.createElement("span", null, this.props.caption,
              React.createElement("span", {className: "glyphicon glyphicon-star", ariaHidden: "true"})
            )
          )
        )
      )
    )
  }
})

var AudioPost = React.createClass({displayName: "AudioPost",
  render: function() {
    return (

      React.createElement("div", {className: "post"},
        React.createElement("img", {id: "avatar", src: 'http://localhost:8080/ipfs/' + profile.avatar}),
        React.createElement("div", {className: "content"},
          React.createElement("div", {className: "header"},
            React.createElement("span", null, this.props.author)
          ),
          React.createElement("img", {src: 'http://localhost:8080/ipfs/' + this.props.artwork}),
          React.createElement("audio", {src: 'http://localhost:8080/ipfs/' + this.props.id, controls: true}),
          React.createElement("div", {className: "footer"},
            React.createElement("span", null, this.props.caption,
              React.createElement("span", {className: "glyphicon glyphicon-star", ariaHidden: "true"})
            )          )
        )
      )
    )
  }
})


var GraphMenu = React.createClass({
  displayName: "GraphMenu",
  render: function() {
    return (


      React.createElement("div", {id: "GraphMenu"},
        React.createElement("div", {className: "btn-group", role: "group", ariaLabel: "..."},
          React.createElement("button", {className: "btn btn-default dropdown-toggle"},
            React.createElement("img", {id: "avatar", src: 'http://localhost:8080/ipfs/' + profile.avatar}),
            profile.username),
          React.createElement("button", {className: "btn btn-default pull-right"}, "+")
        )
      )
        // React.createElement("a", {href: "#"}, "oliver54321",
        //   React.createElement("b", {class: "caret dropdown-toggle"})
        // )
    )
  }

})

var SVGComponent = React.createClass({displayName: "SVGComponent",
    render: function() {
        return React.createElement("svg", React.__spread({},  this.props), this.props.children);
    }
});

var Circle = React.createClass({displayName: "Circle",
    render: function() {
        return React.createElement("circle", React.__spread({},  this.props), this.props.children);
    }
});

var Rectangle = React.createClass({displayName: "Rectangle",
    render: function() {
        return React.createElement("rect", React.__spread({},  this.props), this.props.children);
    }
});

React.render(React.createElement(App, null), document.body);
