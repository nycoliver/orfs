// This file bootstraps the entire application

var App = require('./components/App.react');
var Feed = require('./components/Feed.react');
var Profile = require('./components/Profile.react');
var React = require('react');
var ReactDOM = require('react-dom');



var Router = require('react-router').Router
var Route = require('react-router').Route
var IndexRoute = require('react-router').IndexRoute

var useRouterHistory = require('react-router').useRouterHistory
var createHashHistory = require('history').createHashHistory


const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })



ReactDOM.render(
  <Router history={appHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Feed} />
      <Route path="user/:id" component={Profile} />
    </Route>
  </Router>,
  document.getElementById('react')
);
