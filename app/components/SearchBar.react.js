var React = require('react');
var Dropdown = require('./Dropdown.react');

var PeerStore = require('../Stores/PeerStore');

var SearchBar = React.createClass({
	displayName: "SearchBar",

	getInitialState: function getInitialState() {
    return {
      options: {},
      open: false,
      activeIndex: -1
    };
  },

	componentDidMount: function() {
		PeerStore.addChangeListener(this._onChange);
	},

	_onChange: function() {
		var options = this.state.options;
		var text = this.state.text;

		// text is an ipns id
		if (text && text.length == 46 && text.charAt(0) == 'Q' && text.charAt(1) == 'm') {
			var peerInfo = PeerStore.getInfo(text);
			options.peers = [peerInfo];
			this.setState({options: options});
		}

		else {
			options.peers = null;
			this.setState({options: options});
		}
	},


	textChanged: function(event) {
		var text = event.target.value;

    	this.setState({open: text ? true : false, text: text});
    	var options = this.state.options;

			// It's an ipfs peerid
			if (text.length == 46 && text.charAt(0) == 'Q' && text.charAt(1) == 'm') {
				var peerInfo = PeerStore.getInfo(text);
				options.peers = [peerInfo];
				this.setState({options: options});
			}

			else {
				options.peers = null;
				this.setState({options: options});
			}
	},

	close: function() {
		this.setState({
			options: {},
      open: false,
      activeIndex: -1,
			text: ''
		})
	},

	render: function() {
		return (
			<div className="dropdown search">
	      <form className="form-inline" role="search">
	        <div className="form-group">
	          <input type="text" className="form-control" value={this.state.text} onChange={this.textChanged} placeholder="Search or enter peer id">
	          </input>
	        </div>

	        <Dropdown open={this.state.open} close={this.close} options={this.state.options}/>
	      </form>
	    </div>
		)
	}
})

module.exports = SearchBar;
