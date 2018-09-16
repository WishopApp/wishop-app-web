import React, { Component } from 'react'
import { Layout, Row, Col, Card } from 'antd'

import withLayout from '../utils/with-layout'

const { Content } = Layout

class Profile extends Component {
  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>PROFILE</h3>
          </Col>
          <Col xs={24} md={12}>
            <Card className="m-t-16">
              <h3>Under development...</h3>
            </Card>
          </Col>
        </Row>
      </Content>
    )
  }
}

export default withLayout(Profile, { department: 'beacon' })
