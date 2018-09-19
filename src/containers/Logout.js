import React, { Component } from 'react'
import { withRouter } from 'react-static'
import Cookies from 'js-cookie'

class Logout extends Component {
  componentWillMount() {
    Cookies.remove(process.env.AUTH_TOKEN_NAME)
    this.props.history.push('/login')
  }

  render() {
    return <div />
  }
}

export default withRouter(Logout)
