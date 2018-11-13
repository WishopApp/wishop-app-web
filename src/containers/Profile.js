import React, { Component } from 'react'
import { Layout, Row, Col, Card } from 'antd'
import { withRouter } from 'react-static'

import withLayout from '../utils/with-layout'
import Button from '../components/Form/Button'
import SecondaryButton from '../components/Form/SecondaryButton'

const { Content } = Layout

class Profile extends Component {
  goLogout = () => {
    this.props.history.push('/logout')
  }

  goSetting = () => {
    this.props.history.push('/setting')
  }

  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>PROFILE</h3>
          </Col>
          <Col xs={24} md={12}>
            <Card className="m-t-16">
              <Row className="m-b-16">
                <Button title="STORE SETTING" onClick={this.goSetting} block />
              </Row>
              <Row>
                <SecondaryButton title="LOGOUT" onClick={this.goLogout} block />
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    )
  }
}

export default withLayout(withRouter(Profile), { department: 'beacon' })
