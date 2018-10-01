import React, { Component } from 'react'
import { Link } from 'react-static'
import { Row, Col, Card, Modal, List, Avatar } from 'antd'

import Button from '../Form/Button'
import Input from '../Form/Input'
import Logo from '../../../public/logo/app-logo-no-title.svg'

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

class StaffTable extends Component {
  state = {
    visible: false,
    name: '',
    telNo: '',
    username: '',
    password: '',
  }

  render() {
    return (
      <Row gutter={16}>
        <Col xs={24} md={24}>
          <Row gutter={16}>
            <Col span={24}>
              <h3>DASHBOARD</h3>
            </Col>
            <Col span={24} className="m-t-16">
              <Card>
                <Row gutter={16}>
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
              </Card>
            </Col>
          </Row>
        </Col>

        <Modal
          title="CREATE NEW BRANCH"
          visible={this.state.visible}
          onOk={this.createNewBranch}
          onCancel={() => this.setState({ visible: false })}
          okText="CREATE"
          cancelText="CLOSE"
        >
          <Input
            label="Branch name"
            placeholder="Enter branch name"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Input
            label="Phone number"
            placeholder="Enter phone number"
            value={this.state.telNo}
            onChange={e => this.setState({ telNo: e.target.value })}
          />
          <Input
            label="Account username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <Input
            label="Account password"
            placeholder="Enter password"
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </Modal>
      </Row>
    )
  }
}

export default StaffTable
