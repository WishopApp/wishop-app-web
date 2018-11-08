import React, { Component } from 'react'
import { Layout, Row, Col, Card, List, Avatar } from 'antd'
import { Subscription, Query } from 'react-apollo'

import withLayout from '../utils/with-layout'
import Logo from '../../public/logo/app-logo-no-title.svg'
import { STORE_DETECTED } from '../graphql/subscription/storeDetected'
import { STORE_BRANCHES } from '../graphql/query/store-branch'
import CustomerWishlist from '../components/Dashboard/CustomerWishlist'
import radarSVG from '../../public/logo/radar.svg'
import CustomerChart from '../components/Dashboard/CustomerChart'

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

const LastCustomerWishlists = props => (
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
                <Row
                  type="flex"
                  justify="center"
                  align="middle"
                  style={{ flexDirection: 'column' }}
                >
                  <img src={radarSVG} alt="customer-detecting-radar" />
                  <h4>DETECTING CUSTOMER</h4>
                  <h4 className="m-b-16">PLEASE WAIT</h4>
                  <h5 style={{ color: '#b1b1b1' }}>
                    Please do not close this page
                  </h5>
                  <h5 style={{ color: '#b1b1b1' }}>
                    Only show detected customer while open this page.
                  </h5>
                </Row>
              )
            }
            if (error) return `Error: ${error.message}`

            props.showSmallDetectIcon(true)

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
  state = {
    showSmallDetectIcon: false,
  }

  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>DASHBOARD</h3>
          </Col>
          <Col xs={24} md={24}>
            <Card className="m-t-16">
              <Row type="flex" justify="space-between" align="middle">
                <Row>
                  <h4>YOUR CUSTOMER IS LOOKING FOR</h4>
                  <h5 style={{ color: '#b1b1b1' }}>
                    From lastest detected customer wishlists
                  </h5>
                </Row>

                {this.state.showSmallDetectIcon && (
                  <Row type="flex" align="middle">
                    <span>DETECTING</span>
                    <img
                      src={radarSVG}
                      height="50"
                      alt="customer-detecting-radar"
                    />
                  </Row>
                )}
              </Row>

              <LastCustomerWishlists
                showSmallDetectIcon={value =>
                  this.setState({ showSmallDetectIcon: value })
                }
              />
            </Card>
          </Col>
          <Col xs={24} md={18}>
            <Card className="m-t-16">
              <h4>STATISTIC</h4>
              <h5 style={{ color: '#b1b1b1' }}>
                This statistic is come from detecting system
              </h5>
              <CustomerChart />
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <Card className="m-t-16">
              <h4>CATEGORY RANKING</h4>
              <h5 style={{ color: '#b1b1b1' }}>
                From detected customers wishlist
              </h5>

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
