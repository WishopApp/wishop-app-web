import React, { Component } from 'react'
import { Link } from 'react-static'
import { Row, Col, Card, Modal, Table, Badge, Divider } from 'antd'

import Button from '../Form/Button'

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    status: 'AVAILABLE',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    status: 'OUT OF STOCK',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    status: 'AVAILABLE',
  },
]

class ProductTable extends Component {
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Sub Category',
        dataIndex: 'subCategory',
        key: 'subCategory',
      },
      {
        title: 'Registered At',
        dataIndex: 'registered_at',
        key: 'registered_at',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status =>
          status === 'AVAILABLE' ? (
            <Badge status="success" text="Availalbe" />
          ) : (
            <Badge status="error" text="Out of stock" />
          ),
      },
    ]
    return (
      <Row gutter={16}>
        <Col xs={24} md={6} className="m-b-16">
          <Card>
            <Row type="flex" justify="center" align="middle">
              <Link to="/products/new">
                <Button title="ADD NEW PRODUCT" icon="plus" />
              </Link>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <Card>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <h4>AVAILABLE</h4>
                  <h3>2</h3>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <h4>OUT OF STOCK</h4>
                  <h3>1</h3>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <h4>TOTAL</h4>
                  <h3>3</h3>
                </Card>
              </Col>
              <Col span={24} className="m-t-16">
                <Table columns={columns} dataSource={data} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default ProductTable
