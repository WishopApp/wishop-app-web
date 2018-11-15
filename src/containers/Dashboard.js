import React, { Component } from 'react'
import { Layout, Row, Col, Card, List, Avatar } from 'antd'
import { Subscription, Query } from 'react-apollo'
import { connect } from 'react-redux'

import withLayout from '../utils/with-layout'
import Logo from '../../public/logo/app-logo-no-title.svg'
import { STORE_DETECTED } from '../graphql/subscription/storeDetected'
import { STORE_BRANCHES } from '../graphql/query/store-branch'
import CustomerWishlist from '../components/Dashboard/CustomerWishlist'
import radarSVG from '../../public/logo/radar.svg'
import CustomerChart from '../components/Dashboard/CustomerChart'
import { STORE_BRANCH_STATISTIC } from '../graphql/query/store-statistic'

const { Content } = Layout

const LastCustomerWishlists = props => (
  <Subscription
    subscription={STORE_DETECTED}
    variables={{
      storeBranchId: props.storeBranchId,
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
            <h5 style={{ color: '#b1b1b1' }}>Please do not close this page</h5>
            <h5 style={{ color: '#b1b1b1' }}>
              Only show detected customer while open this page.
            </h5>
          </Row>
        )
      }
      if (error) return `Error: ${error.message}`

      props.showSmallDetectIcon(true)
      props.statisticRefetch()

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

class Dashboard extends Component {
  state = {
    showSmallDetectIcon: false,
  }

  render() {
    if (!this.props.currentUser) {
      return <Card loading />
    }

    return (
      <Query
        query={STORE_BRANCHES}
        variables={{ storeId: this.props.currentUser.storeId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Card loading />
          if (error) return `Error: ${error.message}`

          const storeBranchData = data

          if (data.storeBranches.length === 0) {
            return <Card loading />
          }

          return (
            <Query
              query={STORE_BRANCH_STATISTIC}
              variables={{
                storeBranchId: storeBranchData.storeBranches[0]._id,
              }}
            >
              {({ loading, error, data, refetch }) => {
                if (loading) return <Card loading />
                if (error) return `Error: ${error.message}`

                const statisticData = data

                return (
                  <Content style={{ padding: 16 }}>
                    <Row gutter={16}>
                      <Col span={24}>
                        <h3>DASHBOARD</h3>
                      </Col>
                      <Col xs={24} md={24}>
                        <Card className="m-t-16">
                          <Row
                            type="flex"
                            justify="space-between"
                            align="middle"
                          >
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
                            statisticRefetch={refetch}
                            storeBranchId={storeBranchData.storeBranches[0]._id}
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
                            dataSource={statisticData.categoryRanking}
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
              }}
            </Query>
          )
        }}
      </Query>
    )
  }
}

const DashboardWithStore = connect(
  ({ user }) => ({ currentUser: user.currentUser }),
  null
)(Dashboard)

export default withLayout(DashboardWithStore, { department: 'dashboard' })
