import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'

import withLayout from '../utils/with-layout'

import StepGuide from '../components/Beacon/StepGuide'
import BeaconDashboard from '../components/Beacon/BeaconDashboard'

const { Content } = Layout

class Beacon extends Component {
  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>BEACON</h3>
          </Col>
          <StepGuide />
          <BeaconDashboard />
        </Row>
      </Content>
    )
  }
}

export default withLayout(Beacon, { department: 'beacon' })
