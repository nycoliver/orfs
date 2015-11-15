var ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI('localhost', '5001');
var mm = require('musicmetadata');
var fs = require('fs');

module.exports = {

	uploadImage : function(image, cb) {
		ipfs.add(image, function(err, res) {
			if (err || !res) return t.error(err)
      cb(null, res)
		})
	},

	getArtwork : function(file, cb) {
		var parser = mm(fs.createReadStream(file.path), function (err, metadata) {
		  if (err) throw err;
		  cb(null, new Buffer(metadata.picture[0].data));
		});
	},

	add: function (data, cb) {
    ipfs.add(data, function (err, res) {
    	cb(err, res);
    })
  },

  publish: function(data, cb) {
  	ipfs.add(new Buffer(JSON.stringify(data), "utf8"), function(err, res) {
  		if (err) throw err;
  		ipfs.name.publish(res[0].Hash, function(err, res) { //no options?
    		cb(err, res)
    	})
  	})
  }

}