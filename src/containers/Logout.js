import React, { Component } from 'react'
import { withRouter } from 'react-static'
import Cookies from 'js-cookie'

class Logout extends Component {
  componentWillMount() {
    Cookies.remove(process.env.AUTH_TOKEN_NAME)
    window.location.href = '/login'
  }

  render() {
    return <div />
  }
}

export default withRouter(Logout)
