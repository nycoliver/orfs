var ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI('localhost', '5001')
	// var toBuffer = require('blob-to-buffer')
var mm = require('musicmetadata');
var fs = require('fs');

module.exports = {

	uploadImage: function(image, cb) {
		ipfs.add(image, function(err, res) {
			if (err || !res)
				cb(err)
			cb(null, res)
		})
	},

	uploadFile: function(data, type, cb) {
		var t = this;
		t.add(data, function(err, res) {
			if (err) {
				cb (err)
				return
			}

			var hash = res[0].Hash;

			if (type == "audio/mp3" || type == "audio/x-m4a") {
				t.getMetadata(data, type, function(err, rawMetadata) {
	        if (err)
	          cb(err)
	        else {
	          if (rawMetadata.picture[0] && rawMetadata.picture[0].data) {
	            var artwork = new Buffer(rawMetadata.picture[0].data);
	            t.add([artwork], function(err, res) {
								if (err) {
									cb (err)
									return
								}

								cb(null, {
									"type": type,
									"hash": hash,
									"metadata": {
										artwork: res[0].Hash,
		              	title: rawMetadata.title,
		              	artist:  rawMetadata.artist[0],
		              	album: rawMetadata.album,
		              	year: rawMetadata.year
									}
								})
	            })
	          }
	        }
	      });
			}

			else
				cb(null, {
					"type": type,
					"hash": res[0].Hash,
					"metadata": {
				}
			})

		})
	},



	uploadAudio: function(audio, cb) {

	},

	getMetadata: function(buffer, type, cb) {
		var parser = mm(new Blob([buffer]), function(err, metadata) {
			if (err)
				cb(err);
			cb(null, metadata);
		});
	},

	add: function(data, cb) {
		ipfs.add(data, function(err, res) {
			cb(err, res);
		})
	},

	publish: function(data, cb) {
		console.log("Publishing ", data);
		ipfs.add(new Buffer(JSON.stringify(data), "utf8"), function(err, res) {
			if (err) {
				cb(err);
				return;
			}
			ipfs.name.publish(res[0].Hash, function(err, res) { //no options?
				console.log("PUBLISHED")
				cb(err, res)
			})
			cb()
		})
	}

}
