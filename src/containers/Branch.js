import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'

import withLayout from '../utils/with-layout'
import BranchTable from '../components/Staff/BranchTable'

const { Content } = Layout

class Branch extends Component {
  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>BRANCH</h3>
          </Col>
          <Col span={24} className="m-t-16">
            <BranchTable />
          </Col>
        </Row>
      </Content>
    )
  }
}

export default withLayout(Branch, { department: 'branch' })
