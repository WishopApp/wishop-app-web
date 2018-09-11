import React from 'react'
import { Router, Switch, Route } from 'react-static'

import { hot } from 'react-hot-loader'
/* css */
import 'antd/dist/antd.css'
import './global-css'
/* containers */
import NotFound from './containers/404'
import Dashboard from './containers/Dashboard'
import Login from './containers/Login'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

export default hot(module)(App)
