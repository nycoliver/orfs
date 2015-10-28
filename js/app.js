// This file bootstraps the entire application

var App = require('./components/App.react');
var Utils = require('./utils/Utils');
var React = require('react');


React.render(
  <App />,
  document.getElementById('react')
);





// window.$ = window.jQuery = require('./js/jquery-2.1.4.min.js');
