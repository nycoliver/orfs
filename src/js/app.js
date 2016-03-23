require('./../css/style.css')
require('./../css/tachyons.min.css')
require('./../css/tachyons-lists.min.css')
require('./../css/tachyons-overflow.min.css')
require('./../css/tachyons-utilities.min.css')
require('./../css/tachyons-buttons.css')
require('./../css/Draft.css')

var App = require('./components/App.react');
var Feed = require('./components/Feed.react');
var Profile = require('./components/Profile.react');
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

render(
  <Router history={browserHistory}>
    <Route path="/ipfs/:hash/" component={App}>
      <IndexRoute component={Feed} />
      <Route path="/ipfs/:hash/@:id" component={Profile} />
    </Route>
    <Route path="/" component={App}>
      <IndexRoute component={Feed} />
      <Route path="/@:id" component={Profile} />
    </Route>
  </Router>,
  document.getElementById('root')
);

// render(
//   <Router history={browserHistory}>
//     <Route path="/" component={App}>
//       <IndexRoute component={Feed} />
//       <Route path="user/:id" component={Profile} />
//     </Route>
//   </Router>,
//   document.getElementById('root')
// );
