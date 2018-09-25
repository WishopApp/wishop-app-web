import React, { Component } from 'react'
import { Layout, Row, Col, Card, List, Avatar } from 'antd'

import withLayout from '../utils/with-layout'
import Logo from '../../public/logo/app-logo-no-title.svg'

const { Content } = Layout

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
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    status: 'AVAILABLE',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    status: 'AVAILABLE',
  },
]

class Dashboard extends Component {
  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>DASHBOARD</h3>
          </Col>
          <Col xs={6} md={6}>
            <Card className="m-t-16">
              <h4 className="m-b-16">LAST CUSTOMER</h4>
              <Row type="flex" justify="center">
                <h4 className="m-t-16 m-b-16">Looking for</h4>
              </Row>
              <Row type="flex" justify="center">
                <img src={Logo} alt="" height="50" />
              </Row>
              <Row type="flex" justify="center">
                <h4 className="m-t-16 m-b-16">CATEGORY NAME</h4>
              </Row>
            </Card>
          </Col>
          <Col xs={18} md={12}>
            <Card className="m-t-16">
              <h4>RECENT CUSTOMERS</h4>
              <List
                className="m-t-16"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item>
                    <Row style={{ width: '100%' }}>
                      <Col span={18}>
                        <Row type="flex" align="middle">
                          <p className="m-r-16">{index + 1}</p>
                          <Avatar src={Logo} />
                          <p className="m-l-16">Category Name</p>
                        </Row>
                      </Col>
                      <Col span={6} style={{ height: '100%' }}>
                        <Row type="flex" align="middle" style={{ height: '100%' }}>
                          <p>2018-06-01 17:03</p>
                        </Row>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={18} md={6}>
            <Card className="m-t-16">
              <h4>CATEGORY RANKING</h4>
              <List
                className="m-t-16"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item>
                    <Row type="flex" align="middle">
                      <p className="m-r-16">{index + 1}</p>
                      <Avatar src={Logo} />
                      <p className="m-l-16">Category Name</p>
                    </Row>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    )
  }
}

export default withLayout(Dashboard, { department: 'dashboard' })
