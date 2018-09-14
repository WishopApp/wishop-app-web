import React, { Component } from 'react'
import { Row, Col, Card, Icon, Divider } from 'antd'
import styled from 'styled-components'

import LoginButton from '../components/Login/LoginButton'
import Input from '../components/Form/Input'
import ForgotPassword from '../components/Login/ForgotPassword'
import Link from '../components/Typography/Link'
import LoginWithFacebook from '../components/Login/LoginWithFacebook'
import Logo from '../../public/logo/app-logo-no-title.svg'
import LogoInline from '../../public/logo/app-logo-inline-text.svg'

const LogoBox = styled.div`
  height: 50vh;
  width: 50vh;
  background-color: #fff;

  @media screen and (max-width: 767px) {
    display: none;
  }
`

const LoginWrapper = styled(Card)`
  padding: 25px 40px;
  box-shadow: 3px 0px 5px -2px #00000030;

  @media screen and (max-width: 767px) {
    padding: 10px;
    min-height: 100vh;
  }
`

const MobileLogo = styled.img`
  display: none;

  @media screen and (max-width: 767px) {
    display: block;
  }
`

class Login extends Component {
  state = {
    email: '',
    password: ''
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
          <LoginWrapper>
            <Row style={{ marginBottom: 20 }}>
              <MobileLogo src={LogoInline} alt="" height="50" />
            </Row>
            <Row>
              <h1 style={{ marginBottom: 40, fontSize: 38 }}>Sign In</h1>
            </Row>
            <Row>
              <form onSubmit={() => console.log('ENTER!')}>
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
                <Row style={{ marginBottom: 30 }}>
                  <ForgotPassword />
                </Row>
                <Row style={{ marginBottom: 20 }}>
                  <LoginButton />
                </Row>
                <Row type="flex">
                  <p style={{ marginRight: 10, marginBottom: 10 }}>
                    Don't have an account?{' '}
                  </p>
                  <Link text="Sign up" to="/login" />
                </Row>
                <Row>
                  <Divider>
                    <h5 style={{ color: '#aaa' }}>OR</h5>
                  </Divider>
                </Row>
                <Row type="flex" justify="center">
                  <LoginWithFacebook />
                </Row>
              </form>
            </Row>
          </LoginWrapper>
        </Col>
        <LogoBox>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ height: '100%' }}
          >
            <img src={Logo} alt="" style={{ height: '50%' }} />
          </Row>
        </LogoBox>
      </Row>
    )
  }
}

export default Login
