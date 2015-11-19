# ORFS

A Social Network Built on CJDNS and IPFS

# Development

IPFS Daemon needs to be running locally. See https://github.com/ipfs/go-ipfs for details.
In the future this will use https://github.com/ipfs/js-ipfs to avoid any external dependencies.

    npm install
    cp config.json.example config.json
    node build.js && electron .


# To Do
	[x]IPNS based profiles
		[]ORFS Peer Discovery -- gotta think about the best way to do this!
	[]Search -- also a hard problem!!
	[]LevelDB
	[]Pin posts
