var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('localhost', '5001')

var PostActionCreators = require('../actions/PostActionCreators')
var PeerActionCreators = require('../actions/PeerActionCreators')

var Stream = require('stream')

module.exports = {
  getPeerInfo(peerid, cb) {
      // ipfs.cat('/ipns/'+peerid+'/orfs/profile.json', function(err, res) {
      ipfs.cat('/ipns/' + peerid, function(err, res) {
        if (err || res.Code == 0) {
          console.error("Error resolving name: ", peerid, err, res);
          return;
        }

        if (res.readable) { // Returned as a stream
          var json;
          res.on("data", function(data) {
            json += data
          });
          res.on("end", function() {
            if (!json.profile) return
            PeerActionCreators.foundPeer(peerid, data.profile);
          })
        } else { // Returned as a string
          console.log(res)
        }
      })
    },

    getPostsOfPeer: function(peerid, cb) {
      ipfs.cat('/ipns/' + peerid, function(err, res) {
        if (err) {
          console.error("Error resolving name: ", err, res);
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
            // if (!json.posts) return

            var posts = json;//json.posts;
            for (var i = posts.length - 1; i >= 0; i--) {
              PostActionCreators.foundPost(posts[i]);
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
