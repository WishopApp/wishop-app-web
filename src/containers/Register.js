import React, { Component } from 'react'
import { Row, Col, Card, Divider } from 'antd'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import Cookies from 'js-cookie'
import { withRouter } from 'react-static'

import Button from '../components/Form/Button'
import Input from '../components/Form/Input'
import TextArea from '../components/Form/TextArea'
import ImageUpload from '../components/Form/ImageUpload'

const LoginWrapper = styled(Card)`
  padding: 25px 40px;
  box-shadow: 0px 0px 15px -2px #00000030;
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

class Register extends Component {
  state = {
    email: '',
    password: '',
  }

  //   componentWillMount() {
  //     const token = Cookies.get(process.env.AUTH_TOKEN_NAME)
  //     if (token) {
  //       this.props.history.push('/')
  //     }
  //   }

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
        <Col xs={24} md={20} lg={20}>
          <form onSubmit={e => this.onLogin(e)}>
            <LoginWrapper>
              <Row className="m-b-16" type="flex" justify="center">
                <h1 style={{ fontSize: 38 }}>Create new store</h1>
              </Row>
              <Row type="flex" justify="center">
                <Col xs={24} md={12}>
                  <h4>Store Avatar</h4>
                  <Row type="flex" justify="center">
                    <ImageUpload />
                  </Row>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col xs={24} md={12}>
                  <Input
                    label="Store Name"
                    type="text"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col xs={24} md={12}>
                  <TextArea
                    label="Store Description"
                    type="text"
                    rows={8}
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col xs={24} md={12}>
                  <Button title="CREATE" />
                </Col>
              </Row>
            </LoginWrapper>
          </form>
        </Col>
      </Row>
    )
  }
}

// const LoginMutation = props => (
//   <Mutation mutation={LOGIN}>
//     {(login, _) => <Login login={login} {...props} />}
//   </Mutation>
// )

export default withRouter(Register)
