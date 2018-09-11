import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import styled from 'styled-components'

import LoginButton from '../components/LoginButton'
import Input from '../components/Input'
import ForgotPassword from '../components/ForgotPassword'
import Link from '../components/Link'
import Logo from '../../public/logo/app-logo-no-title.svg'

const LogoBox = styled.div`
  height: 50vh;
  width: 50vh;
  background-color: #fff;

  @media screen and (max-width: 767px) {
    display: none;
  }
`

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: '100vh', backgroundColor: '#00a9ff' }}
      >
        <Col xs={24} md={12} lg={8}>
          <Card style={{ padding: 50, boxShadow: '3px 0px 5px -2px #00000030' }}>
            <Row>
              <h1 style={{ marginBottom: 40, fontSize: 38 }}>Sign In</h1>
            </Row>
            <Row>
              <Input
                label="Email"
                type="text"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
              <Input
                label="Password"
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
              <Row style={{ marginBottom: 50 }}>
                <ForgotPassword />
              </Row>
              <Row style={{ marginBottom: 10 }}>
                <LoginButton />
              </Row>
              <Row type="flex">
                <p style={{ marginRight: 10 }}>Don't have an account? </p>
                <Link text="Sign up" to="/login" />
              </Row>
            </Row>
          </Card>
        </Col>
        <LogoBox>
          <Row type="flex" justify="center" align="middle" style={{ height: '100%' }}>
            <img src={Logo} alt="" style={{ height: '50%' }} />
          </Row>
        </LogoBox>
      </Row>
    )
  }
}

export default Login
