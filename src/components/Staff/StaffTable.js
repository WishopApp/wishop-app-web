import React, { Component } from 'react'
import { Link } from 'react-static'
import { Row, Col, Card, Modal, Table } from 'antd'

import Button from '../Form/Button'
import Input from '../Form/Input'

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

class StaffTable extends Component {
  state = {
    visible: false,
    name: '',
    telNo: '',
    username: '',
    password: '',
  }

  render() {
    const columns = [
      {
        title: 'Branch Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Tel no.',
        dataIndex: 'tel_no',
        key: 'tel_no',
      },
      {
        title: 'Registered At',
        dataIndex: 'registered_at',
        key: 'registered_at',
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        key: 'operation',
        render: () => <Link to={`/staffs/1`}>DETAIL</Link>,
      },
    ]
    return (
      <Row gutter={16}>
        <Col xs={24} md={6} className="m-b-16">
          <Card>
            <Row type="flex" justify="center" align="middle">
              <Button
                title="CREATE NEW BRANCH"
                icon="plus"
                onClick={() => this.setState({ visible: true })}
              />
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
