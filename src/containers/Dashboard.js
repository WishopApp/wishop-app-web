import React, { Component } from 'react'
import { Layout, Row, Col, Card, List, Avatar } from 'antd'
import { Subscription, Query } from 'react-apollo'

import withLayout from '../utils/with-layout'
import Logo from '../../public/logo/app-logo-no-title.svg'
import { STORE_DETECTED } from '../graphql/subscription/storeDetected'
import { STORE_BRANCHES } from '../graphql/query/store-branch'
import CustomerWishlist from '../components/Dashboard/CustomerWishlist'

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

const LastCustomerWishlists = () => (
  <Query query={STORE_BRANCHES}>
    {({ loading, error, data }) => {
      if (loading) return <Card loading />
      if (error) return `Error: ${error.message}`

      return (
        <Subscription
          subscription={STORE_DETECTED}
          variables={{
            storeBranchId: data.storeBranches[0]._id,
          }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <Row type="flex" justify="center">
                  <h4>Waiting for customer...</h4>
                </Row>
              )
            }
            if (error) return `Error: ${error.message}`

            return (
              <div>
                <Row type="flex" justify="space-around">
                  {data.storeDetected.map((wishlist, index) => (
                    <CustomerWishlist key={index} wishlist={wishlist} />
                  ))}
                </Row>
              </div>
            )
          }}
        </Subscription>
      )
    }}
  </Query>
)

class Dashboard extends Component {
  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>DASHBOARD</h3>
          </Col>
          <Col xs={24} md={24}>
            <Card className="m-t-16">
              <h4 className="m-b-16">LAST CUSTOMER IS LOOKING FOR</h4>
              <LastCustomerWishlists />
            </Card>
          </Col>
          <Col xs={24} md={12}>
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
                          <p className="m-l-16">{item.name}</p>
                        </Row>
                      </Col>
                      <Col span={6} style={{ height: '100%' }}>
                        <Row
                          type="flex"
                          align="middle"
                          style={{ height: '100%' }}
                        >
                          <p>2018-06-01 17:03</p>
                        </Row>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={6}>
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
