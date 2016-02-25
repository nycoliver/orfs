var ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})
var JSONStream = require('JSONStream');
var es = require('event-stream');

var PostActionCreators = require('../actions/PostActionCreators');
var PeerActionCreators = require('../actions/PeerActionCreators');


module.exports = {
	getPeerInfo: function(peerid, cb) {
		// ipfs.cat('/ipns/'+peerid+'/orfs/profile.json', function(err, res) {
		ipfs.cat('/ipns/'+peerid, function(err, res) {
			if (err || res.Code == 0)	{
				console.log("Error resolving name: ", err, res);
				return;
			}

			if(res.readable) {
					 // Returned as a stream
					res.pipe(JSONStream.parse())
          .pipe(es.mapSync(function (data) {
						if (!data.profile)
							return
						PeerActionCreators.foundPeer(peerid, data.profile);
          }))
			 } else {
					 // Returned as a string
					 console.log(res)
			 }
		})
	},

	getPostsOfPeer: function(peerid, cb) {
		ipfs.cat('/ipns/'+peerid, function(err, res) {
			if (err)	{
				console.log("Error resolving name: ", err, res);
				return;
			}
			if(res.readable) {
					 // Returned as a stream
					res.pipe(JSONStream.parse())
          .pipe(es.mapSync(function (data) {
						if (!data.posts)
							return
						var posts = data.posts;
            for (var i = posts.length-1; i >= 0; i--) {
            	PostActionCreators.foundPost(posts[i]);
            };
          }))
			 } else {
					 // Returned as a string
					 console.log(res)
			 }
		})
	},

	getSwarm: function(cb) {
		ipfs.swarm.peers(cb);
	}
}
