var React = require('react');
var Dropdown = require('./Dropdown.react');

var SearchBar = React.createClass({
	displayName: "SearchBar",

	getInitialState: function getInitialState() {
	    return {
	      options: {},
	      open: false,
	      activeIndex: -1
	    };
	  },

	textChanged: function(event) {
		// e.preventDefault();

		var text = event.target.value;

    	this.setState({open: text ? true : false});

    	var options = this.state.options;

    	if (text.length == 46 && text.charAt(0) == 'Q' && text.charAt(1) == 'm') {
    		options.peers = [text];
    		this.setState({options: options});
    		console.log(options)
    	}

    	else {
    		options.peers = null;
    		this.setState({options: options});
    	}
	},

	render: function() {
		return (
		<div className="dropdown search">
	      <form className="navbar-form" role="search">
	        <div className="form-group">
	          <input type="text" className="form-control" onChange={this.textChanged} placeholder="Search for peers or posts...">
	          </input>
	        </div>

	        <Dropdown open={this.state.open} options={this.state.options}/>
	      </form>
	    </div>
	    )
	}
})

module.exports = SearchBar;