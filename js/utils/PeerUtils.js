var ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI('localhost', '5001');
var JSONStream = require('JSONStream');
var es = require('event-stream');

var PostActionCreators = require('../actions/PostActionCreators');


module.exports = {
	getPostsOfPeer: function(peerid, cb) {

		ipfs.name.resolve(peerid, function(err, res) {
			if (err) throw err;

		    ipfs.ls(res.Path, function(err, res) {
		      if(err || !res) throw err;

		      res.Objects.forEach(function(object) {
		      	// HUGE WARNING THIS WILL ONLY WORK ON MY TEST ADDRESS!!!

		        // node.Links.forEach(function(link) {

		          // if (link.Name == "orfs.json")
		          //   console.log("Found orfs.json: " + JSON.stringify(link, null, 4));
		          ipfs.cat(object.Hash, function(err, res) {
		              if(err || !res) return console.error(err)

		              if(res.readable) {
		                  // Returned as a stream
	                  res.pipe(JSONStream.parse())
	                  .pipe(es.mapSync(function (data) {
	                    for (var i = 0; i < data.length-1; i++) {
	                    	PostActionCreators.foundPost(data[i]);
	                    };
	                  }))
		              } else {
		                  // Returned as a string
		                  // insertPosts(res.files);
		              }
		          })
		        // })
		      });
		    })
		})
	}


}