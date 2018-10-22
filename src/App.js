import React from 'react'
import { Router, Switch, Route } from 'react-static'
import universal from 'react-universal-component'
import { hot } from 'react-hot-loader'
import { ApolloProvider } from 'react-apollo'
/* css */
import 'antd/dist/antd.css'
import './global-css'
/* graphql */
import client from './utils/apollo-connector'

const Loading = () => <div />

const options = {
  loading: Loading,
}

const Register = universal(import('./containers/Register'), options)
const Login = universal(import('./containers/Login'), options)
const Logout = universal(import('./containers/Logout'), options)
const NotFound = universal(import('./containers/404'), options)

const Dashboard = universal(import('./containers/Dashboard'), options)
const Product = universal(import('./containers/Product'), options)
const AddProduct = universal(import('./containers/AddProduct'), options)
const Beacon = universal(import('./containers/Beacon'), options)
const BranchDetail = universal(import('./containers/BranchDetail'), options)
const Staff = universal(import('./containers/Staff'), options)
const Profile = universal(import('./containers/Profile'), options)

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/products/new" component={AddProduct} />
        <Route path="/products" component={Product} />
        <Route path="/beacons" component={Beacon} />
        <Route path="/staffs/:id" component={BranchDetail} />
        <Route path="/staffs" component={Staff} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </ApolloProvider>
)

export default hot(module)(App)
