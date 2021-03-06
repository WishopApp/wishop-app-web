import React, { Component } from 'react'
import { Row, Col, Card, Table, Modal, Badge, Select } from 'antd'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import moment from 'moment'
import { filter } from 'lodash'

import Button from '../Form/Button'
import Input from '../Form/Input'
import { STORE_BRANCHES } from '../../graphql/query/store-branch'
import { BEACONS } from '../../graphql/query/beacon'

const { Option } = Select

class BeaconDashboard extends Component {
  state = {
    visible: false,
    phoneNumber: '',
    storeBranchId: '',
  }

  render() {
    const columns = [
      {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'TYPE',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'REGISTERED AT',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: createdAt => (
          <div>
            <span>{moment(createdAt).format('DD-MM-YYYY')}</span>
            <br />
            <span>{moment(createdAt).format('HH:mm')}</span>
          </div>
        ),
      },
      {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
        render: status => {
          if (status === 'IDLE') {
            return <Badge status="success" text="Running" />
          }
        },
      },
    ]

    if (!this.props.currentUser) {
      return <Card loading />
    }

    return (
      <Col span={24} className="m-t-16">
        <Row gutter={16} type="flex" justify="center">
          <Col xs={24} md={6} className="m-b-16">
            <Col span={24}>
              <Card>
                <Row gutter={16} type="flex" justify="center">
                  <Col xs={24} md={24}>
                    <h4 className="m-b-16">SELECT BRANCH</h4>
                    <Query
                      query={STORE_BRANCHES}
                      variables={{ storeId: this.props.currentUser.storeId }}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...'
                        if (error) return `Error: ${error.message}`

                        if (!this.state.storeBranchId) {
                          this.setState({
                            storeBranchId: data.storeBranches[0]._id,
                          })
                        }

                        return (
                          <Select
                            defaultValue="Main"
                            style={{ width: '100%' }}
                            onChange={value =>
                              this.setState({ storeBranchId: value })
                            }
                          >
                            {data.storeBranches.map((branch, index) => (
                              <Option key={index} value={branch._id}>
                                {branch.name}
                              </Option>
                            ))}
                          </Select>
                        )
                      }}
                    </Query>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24} className="m-t-16">
              <Card>
                <Row gutter={16} type="flex" justify="center">
                  <Col xs={24} md={24}>
                    <h4 className="m-b-16">DO YOU WANT TO UPGRADE ?</h4>
                    <Button icon="plus" title="ORDER MORE" />
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24} className="m-t-16" style={{ marginBottom: 50 }}>
              <Card>
                <h4>HAVE A PROBLEM ?</h4>
                <p>CONTACT US: 082-584-5803</p>
              </Card>
            </Col>
          </Col>

          <Col xs={24} md={18}>
            <Col span={24}>
              <Card>
                <Row gutter={16}>
                  <Col span={24} className="m-t-16">
                    <Query
                      query={BEACONS}
                      variables={{ assignId: this.state.storeBranchId }}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...'
                        if (error) return `Error: ${error.message}`

                        const beacons = data.beacons

                        if (beacons) {
                          const expireCount = filter(beacons, {
                            status: 'EXPIRE',
                          }).length
                          const inuseCount = filter(beacons, {
                            status: 'INUSE',
                          }).length
                          const total = beacons.length

                          return (
                            <div>
                              <Row gutter={16}>
                                <Col span={8}>
                                  <Card>
                                    <h4>RUNNING</h4>
                                    <h3>{inuseCount}</h3>
                                  </Card>
                                </Col>
                                <Col span={8}>
                                  <Card>
                                    <h4>EXPIRE</h4>
                                    <h3>{expireCount}</h3>
                                  </Card>
                                </Col>
                                <Col span={8}>
                                  <Card>
                                    <h4>TOTAL</h4>
                                    <h3>{total}</h3>
                                  </Card>
                                </Col>
                              </Row>

                              <Col span={24} className="m-t-16">
                                <Table
                                  columns={columns}
                                  dataSource={data.beacons}
                                />
                              </Col>
                            </div>
                          )
                        }
                      }}
                    </Query>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Col>
        </Row>

        <Modal
          title="REQUEST FOR BEACON"
          visible={this.state.visible}
          onOk={this.sendBeaconRequest}
          onCancel={() => this.setState({ visible: false })}
          okText="SEND REQUEST"
          cancelText="CLOSE"
        >
          <Input
            label="Phone number"
            placeholder="Enter phone number"
            value={this.state.phoneNumber}
            onChange={e => this.setState({ phoneNumber: e.target.value })}
          />
        </Modal>
      </Col>
    )
  }
}

const BeaconDashboardWithStore = connect(
  ({ user }) => ({ currentUser: user.currentUser }),
  null
)(BeaconDashboard)

export default BeaconDashboardWithStore
