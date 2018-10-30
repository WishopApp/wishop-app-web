import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'

import withLayout from '../utils/with-layout'
import BeaconDashboard from '../components/Beacon/BeaconDashboard'

const { Content } = Layout

class Beacon extends Component {
  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>BEACON IN STORE</h3>
          </Col>
          <BeaconDashboard />
        </Row>
      </Content>
    )
  }
}

export default withLayout(Beacon, { department: 'beacon' })
