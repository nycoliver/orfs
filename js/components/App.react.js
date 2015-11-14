var React = require('react');
var Feed = require('./Feed.react');
var TopBar = require('./TopBar.react');

var App = React.createClass({
  displayName: 'App',

  render: function render() {
    return (
      <div className="app">
      	<TopBar />
        <Feed />
      </div>
    );
  }

})

module.exports = App;

// React.createElement("div", null,
//   React.createElement("div", {id: "graph"}),
//   React.createElement("img", {id: "logo", src: "./img/logo.png"}),
//   React.createElement(Stream, null),
//   React.createElement(GraphMenu, null)
// )
