import React from 'react'
import { Router, Switch, Route } from 'react-static'
import { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
/* ant.design */
import 'antd/dist/antd.css'
/* containers */
import NotFound from './containers/404'
import Dashboard from './containers/Dashboard'

injectGlobal`
  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }

  body * {
    font-family: 'Work Sans', sans-serif;
    letter-spacing: .004em;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: 'Montserrat', sans-serif;
    color: black;
    margin: 0;
  }

  p {
    color: black;
    font-family: 'Work Sans', sans-serif;
  }

  a {
    font-family: 'Work Sans', sans-serif;
  }

  .ant-menu-item {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
  }

  .m-b-16 {
    margin-bottom: 16px;
  }
  .m-t-16 {
    margin-top: 16px;
  }
  .m-r-16 {
    margin-right: 16px;
  }
  .m-l-16 {
    margin-left: 16px;
  }
`

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

export default hot(module)(App)
