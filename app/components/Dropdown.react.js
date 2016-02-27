var React = require('react');
var Link = require('react-router').Link

var PeerActionCreators = require('../actions/PeerActionCreators');

var Avatar = require('./Avatar.react');

var Dropdown = React.createClass({

	render: function() {
		var ulClass = this.props.open ? "dropdown dropdown-menu open" : "dropdown-menu";
		var peers;
		var noResults;
		var close = this.props.close;

		console.log(this.props)

		if (this.props.options.peers) {
			peers = this.props.options.peers.map(function(peer, index) {
				var status = peer.status;
				var shortId = peer.id.substring(2,10);
				if (status == "known")
					return (
						<Link to={"/user/"+peer.id}>
								<li className={"peer-result "+peer.status} key={index} onClick={close}>

										<Avatar image={peer.avatar} />
										<div className={"name-and-id"}>
											<h2 className={"username"}>{peer.username}</h2>
											<h2 className={"shortid"}>@{shortId}</h2>
										</div>

								</li>
							</Link>
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
