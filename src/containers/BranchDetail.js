import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'

import withLayout from '../utils/with-layout'
import BranchDetail from '../components/Staff/BranchDetail'

const { Content } = Layout

class Staff extends Component {
  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>BRANCH DETAIL</h3>
          </Col>
          <Col span={24} className="m-t-16">
            <BranchDetail />
          </Col>
        </Row>
      </Content>
    )
  }
}

export default withLayout(Staff, { department: 'staff' })
