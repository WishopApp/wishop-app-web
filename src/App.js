import React from 'react'
import { Router, Switch, Route } from 'react-static'
import universal from 'react-universal-component'
import { hot } from 'react-hot-loader'
/* css */
import 'antd/dist/antd.css'
import './global-css'

const Loading = () => <div />

const options = {
  loading: Loading
}

const Dashboard = universal(import('./containers/Dashboard'), options)
const Login = universal(import('./containers/Login'), options)
const NotFound = universal(import('./containers/404'), options)

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
