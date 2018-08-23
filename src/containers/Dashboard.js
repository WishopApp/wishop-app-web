import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'

import withLayout from '../utils/with-layout'

const { Content } = Layout

class Dashboard extends Component {
  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={8} offset={8}>
            <h1>DASHBOARD</h1>
          </Col>
        </Row>
      </Content>
    )
  }
}

export default withLayout(Dashboard)
