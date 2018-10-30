import React, { Component } from 'react'
import { Row, Col, Card, Divider } from 'antd'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import Cookies from 'js-cookie'
import { withRouter } from 'react-static'

import LoginButton from '../components/Login/LoginButton'
import Input from '../components/Form/Input'
import ForgotPassword from '../components/Login/ForgotPassword'
import Link from '../components/Typography/Link'
import LoginWithFacebook from '../components/Login/LoginWithFacebook'
import LogoInline from '../../public/logo/logo-with-sub.svg'
import LogoM from '../../public/logo/logo-with-sub-m.svg'
import { LOGIN } from '../graphql/authentication/mutation'

const LogoBox = styled(Col)`
  height: 100vh;
  background-color: #fff;

  @media screen and (max-width: 767px) {
    display: none;
  }
`

const LoginWrapper = styled(Card)`
  padding: 25px 40px;
  box-shadow: 0px 0px 15px -2px #00000030;
  max-width: 480px;
  min-width: 368px;
  margin-left: auto;
  margin-right: 10px;

  @media screen and (max-width: 767px) {
    padding: 10px;
    min-height: 100vh;
    max-width: unset;
    margin-right: unset;
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
    password: '',
  }

  componentWillMount() {
    const token = Cookies.get(process.env.AUTH_TOKEN_NAME)
    if (token) {
      this.props.history.push('/')
    }
  }

  onLogin = async e => {
    try {
      e.preventDefault()

      const { data } = await this.props.login({
        variables: { email: this.state.email, password: this.state.password },
      })

      Cookies.set(process.env.AUTH_TOKEN_NAME, data.login, { expires: 7 })
      this.props.history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: '100vh' }}
      >
        <Col xs={24} md={14} lg={12}>
          <LoginWrapper>
            <Row style={{ marginBottom: 20 }}>
              <MobileLogo
                src={LogoM}
                alt=""
                height="60"
                style={{ marginLeft: 'auto' }}
              />
            </Row>
            <Row>
              <h1 style={{ marginBottom: 40, fontSize: 38 }}>Sign In</h1>
            </Row>
            <Row>
              <form onSubmit={e => this.onLogin(e)}>
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
                  <p style={{ marginRight: 5, marginBottom: 10 }}>
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
        <LogoBox md={8} lg={12}>
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ height: '100%' }}
          >
            <img
              src={LogoInline}
              alt=""
              style={{
                width: '50%',
                marginRight: 'auto',
                marginLeft: 50,
                minWidth: 230,
              }}
            />
          </Row>
        </LogoBox>
      </Row>
    )
  }
}

const LoginMutation = props => (
  <Mutation mutation={LOGIN}>
    {(login, _) => <Login login={login} {...props} />}
  </Mutation>
)

export default withRouter(LoginMutation)
