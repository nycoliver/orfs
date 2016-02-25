var React = require('react');

var PeerActionCreators = require('../actions/PeerActionCreators');

var Avatar = require('./Avatar.react');

function _close() {

}

var Dropdown = React.createClass({



	render: function() {
		var ulClass = this.props.open ? "dropdown dropdown-menu open" : "dropdown-menu";
		var peers;
		var noResults;

		if (this.props.options.peers) {
			peers = this.props.options.peers.map(function(peer, index) {
				var status = peer.status;
				console.log(peer)
				if (status == "known")
					return (
							<li className={peer.status} key={index}>
								<Link to={"/user/"+peer.id}>
									<Avatar image={peer.avatar} />
									{peer.name}
								</Link>
							</li>
						)
				else
					return (
							<li className={peer.status} key={index}>Searching...</li>
						)
			})
		}

		return (

			<ul className={ulClass}>

			    {peers}
			    {noResults}
			</ul>
		)
	}
})

module.exports = Dropdown;
