// This file bootstraps the entire application

var App = require('./components/App.react');
var React = require('react');
var ReactDOM = require('react-dom');


ReactDOM.render(
  <App />,
  document.getElementById('react')
);
