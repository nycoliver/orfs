var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', '5001')

var PostActionCreators = require('../actions/PostActionCreators')
var PeerActionCreators = require('../actions/PeerActionCreators')

var Stream = require('stream')

module.exports = {
  getPeerInfo(peer, cb) {
      console.log('???')
      // ipfs.cat('/ipns/'+peerid+'/orfs/profile.json', function(err, res) {
      ipfs.cat('/ipns/' + peer.id, function(err, res) {
        if (err || res.Code == 0) {
          console.error("Error resolving name: ", peer.id, err, res);
          return;
        }

        if (res.readable) { // Returned as a stream
          var json;
          res.on("data", function(data) {
            json += data
          });
          res.on("end", function() {
            if (!json.profile) return
            PeerActionCreators.foundPeer(peer.id, data.profile);
          })
        } else { // Returned as a string
          console.log(res)
        }
      })
    },

    getPostsOfPeer: function(peer, cb) {
      ipfs.cat('/ipns/' + peer.id, function(err, res) {
        if (err) {
          console.error("Error resolving name: ", peer.id, err, res);
          return;
        }
        if (res.readable) { // Returned as a stream
          var json = "";
          res.on("data", function(data) {
            json += data
          });
          res.on("end", function() {
            try {
              json = JSON.parse(json)
            } catch (err) {
              console.log("Unable to parse json:", err)
            }

            //check for null here
            var profile = json;//json.posts;
            for (var i = profile.posts.length - 1; i >= 0; i--) {
            console.log("Found post", profile.posts[i])
              PostActionCreators.foundPost(profile.posts[i]);
            };
          })
        } else {
          // Returned as a string
          var posts = res.posts;
          for (var i = posts.length - 1; i >= 0; i--) {
            PostActionCreators.foundPost(posts[i]);
          };
        }
      })
    },

    getSwarm: function(cb) {
      ipfs.swarm.peers(cb);
    }
}
