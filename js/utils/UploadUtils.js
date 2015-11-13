var ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI('localhost', '5001');

module.exports = {

	uploadImage : function(image, cb) {
		ipfs.add(image, function(err, res) {
			if (err || !res) return t.error(err)
        	cb(null, res)
		})
	},

	uploadMp3 : function() {

	},

	add: function (data, cb) {
	  console.log('add ', data);
      ipfs.add(data, function (err, res) {
      	cb(err, res);
      })
    }

}