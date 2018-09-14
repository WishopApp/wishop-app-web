import React, { Component } from 'react'
import { Layout, Row, Col, Card } from 'antd'

import withLayout from '../utils/with-layout'

const { Content } = Layout

class Dashboard extends Component {
  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>DASHBOARD</h3>
          </Col>
          <Col span={12}>
            <Card className="m-t-16">
              <h4>Table</h4>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="m-t-16">
              <h4>Table</h4>
            </Card>
          </Col>
        </Row>
      </Content>
    )
  }
}

export default withLayout(Dashboard, { department: 'dashboard' })
