import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd'

import withLayout from '../utils/with-layout'
import ProductTable from '../components/Product/ProductTable'

const { Content } = Layout

class Product extends Component {
  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>PRODUCT</h3>
          </Col>
          <Col span={24} className="m-t-16">
            <ProductTable />
          </Col>
        </Row>
      </Content>
    )
  }
}

export default withLayout(Product, { department: 'product' })
