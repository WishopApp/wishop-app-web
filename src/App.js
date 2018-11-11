import React from 'react'
import { Router, Switch, Route } from 'react-static'
import universal from 'react-universal-component'
import { hot } from 'react-hot-loader'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'

/* css */
import 'antd/dist/antd.css'
import './global-css'
/* graphql */
import client from './utils/apollo-connector'
/* store */
import store from './utils/connector/index'

// Development Import
// import CreateStore from './containers/CreateStore'
// import Login from './containers/Login'
// import Logout from './containers/Logout'
// import NotFound from './containers/404'
// import Dashboard from './containers/Dashboard'
// import Product from './containers/Product'
// import AddProduct from './containers/AddProduct'
// import AddPromotion from './containers/AddPromotion'
// import Beacon from './containers/Beacon'
// import Branch from './containers/Branch'
// import Profile from './containers/Profile'
// import Setting from './containers/Setting'

const Loading = () => <div />

const options = {
  loading: Loading,
}

const CreateStore = universal(import('./containers/CreateStore'), options)
const Login = universal(import('./containers/Login'), options)
const Logout = universal(import('./containers/Logout'), options)
const NotFound = universal(import('./containers/404'), options)
const Dashboard = universal(import('./containers/Dashboard'), options)
const Product = universal(import('./containers/Product'), options)
const AddProduct = universal(import('./containers/AddProduct'), options)
const AddPromotion = universal(import('./containers/AddPromotion'), options)
const Beacon = universal(import('./containers/Beacon'), options)
const Branch = universal(import('./containers/Branch'), options)
const Profile = universal(import('./containers/Profile'), options)
const Setting = universal(import('./containers/Setting'), options)

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/create" component={CreateStore} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/products/new" component={AddProduct} />
          <Route path="/promotion/new" component={AddPromotion} />
          <Route path="/products" component={Product} />
          <Route path="/beacons" component={Beacon} />
          <Route path="/branches" component={Branch} />
          <Route path="/profile" component={Profile} />
          <Route path="/setting" component={Setting} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  </ApolloProvider>
)

export default hot(module)(App)
