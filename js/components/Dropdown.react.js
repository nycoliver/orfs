var React = require('react');

var Dropdown = React.createClass({



	render: function() {
		console.log(this.props.options)
		var ulClass = this.props.open ? "dropdown dropdown-menu open" : "dropdown-menu";
		var peers;
		var noResults;

		if (this.props.options.peers)
			peers = this.props.options.peers.map(function(peer, index) {
				if (index == 0)
					return ([
						<li className="dropdown-header">Peers</li>,
						<li className="disabled"><a href="#">{peer}</a></li>
						]
					)
				return (
					<li><a href="#">{peer}</a></li>
				)
			})


		else
			noResults = <li><a href="#">No Results</a></li>

		return (

			<ul className={ulClass}>
	         	
			    {peers}
			    {noResults}
			</ul>
		)
	}
})

module.exports = Dropdown;