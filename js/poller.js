var ipfs_api = require('ipfs-api');
var ipfs = ipfs_api('localhost', '5001');
var cjdnsAdmin = require('cjdns-admin');
var fs = require('fs');
var id3 = require('id3js');
var alac = require('alac');
var restify = require('restify');
var request = require('request');
var JSONStream = require('JSONStream');
var es = require('event-stream');

var PostActionCreators = require('./actions/PostActionCreators');


var config = require('../config.json');

var knownPeers = {};

function insertPosts(posts) {
  console.log("adding posts");
  for (var i = 0; i < posts.length; i++) {
    console.log(posts[i]);
    PostActionCreators.foundPost(posts[i]);
  }
  // Stream.setState({files: files.files});
}


function getPosts(id) {
  console.log("Resolving ipns " + id);

  ipfs.name.resolve(id, function(err, res) {

    if (err) return console.error(err);

    console.log("Resolved! " + JSON.stringify(res, null, 4))
    ipfs.ls(res.Path, function(err, res) {

      if(err || !res) return console.error(err)

      console.log("LSd!" + JSON.stringify(res));
      res.Objects.forEach(function(node) {
        node.Links.forEach(function(link) {
          if (link.Name == "orfs.json")
            console.log("Found files: " + JSON.stringify(link, null, 4));
          ipfs.cat(link.Hash, function(err, res) {
              if(err || !res) return console.error(err)

              if(res.readable) {


                  // Returned as a stream
                  res.pipe(process.stdout)
                  res.pipe(JSONStream.parse('files'))
                  .pipe(es.mapSync(function (data) {
                    insertPosts(data)
                  }))
              } else {
                  // Returned as a string
                  insertPosts(res.files);
              }
          })
        })
      });
    })
  })
}

// getPosts("QmXE8vq2LsEmdHHtb95ujTv2Hfag4qTjk2fehwC8HVXcMn");

// create a new Admin
var admin = cjdnsAdmin.createAdmin(config.cjdnsAdmin);


function getInfoOfPeer(peerIp) {
  request("http://["+peerIp+"]:5002/profile", function(err, res, body) {
    if (err)
      console.log(err)
    else {
      knownPeers[peerIp].orfs = JSON.parse(body)
      getPosts(knownPeers[peerIp].orfs.id)
      console.log(knownPeers[peerIp], files)
    }
  })
}



// create a response handler
function peersResponse (res) {
    // process ping response

    // console.dir(JSON.stringify(res.data.routingTable, null, 4));

    for (var i=0; i<res.data.routingTable.length; i++) {
      var peer = res.data.routingTable[i];
      knownPeers[peer.ip] = peer;
      knownPeers[peer.ip].lastSeen = new Date();

      getInfoOfPeer(peer.ip);
    }

    //console.log(JSON.stringify(knownPeers, null, 4));

    if (res.data && res.data.more)
      dumpPeers(res.args.page+1)
}

function dumpPeers(page) {
  // ping the admin
  var channel = admin.nodeStore.dumpTable({
      page: page
  });

  // handle the response
  admin.on(channel, peersResponse);
}

dumpPeers(0)
setInterval(function(){dumpPeers(0)}, 60*1000)

var files;
var exists = fs.existsSync('../orfs.json');
if (exists) {
  files = require('../orfs.json');
}

var profile = config.profile;

/** PUBLIC API **/
var server = restify.createServer();
server.get('/profile', sendProfile);

function sendProfile(req, res, next) {
  res.send(profile);
}

server.listen(5002);
