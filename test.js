var ipfs_api = require('ipfs-api');
var ipfs = ipfs_api('localhost', '5001');

var data = {"test": "asdf"};

ipfs.add(data, function (err, res) {
  if (err || !res) return t.error(err)
  res = res[0]

  console.log(res)
})
