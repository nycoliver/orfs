var ipfsAPI = require('ipfs-api');
var ipfs = ipfsAPI('localhost', '5004');

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
      	console.log("Nice!!!!");
      	console.log(res);
      	cb(err, res);
        // if (err || !res) return t.error(err)
        // res = res[0]

        // var metadata = {
        //   id: res.Hash,
        //   name: res.Name || file.name,
        //   type: file.type,
        //   size: file.size
        // }

        // console.log(metadata)

        // var nextFiles = (t.state.files || [])
        // nextFiles.unshift(metadata)
        // t.setState({
        //   files: nextFiles
        // })

        // fs.writeFile('files.json', JSON.stringify(files))
      })
    }

}