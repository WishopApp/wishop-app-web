import React, { Component } from 'react'
import { Link } from 'react-static'
import { Row, Col, Card, Modal, Table, Badge, Divider } from 'antd'

import Button from '../Form/Button'
import Input from '../Form/Input'

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

class BeaconDashboard extends Component {
  state = {
    visible: false,
    detailVisible: false,
    type: 'INDOOR',
    locationX: '',
    locationY: '',
    dataSource: ['A', 'B', 'C'],
    storeType: 'DEMO',
    phoneNumber: '',
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
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
        render: () => <Badge status="processing" text="NEW" />,
      },
    ]

    return (
      <Col span={24} className="m-t-16">
        <Row gutter={16} type="flex" justify="center">
          <Col xs={24} md={18} className="m-b-16">
            <Col span={24}>
              <Card>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card>
                      <h4>LOCATION</h4>
                      <h3>10</h3>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <h4>STICKER</h4>
                      <h3>10</h3>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <h4>TOTAL</h4>
                      <h3>10</h3>
                    </Card>
                  </Col>
                  <Col span={24} className="m-t-16">
                    <Table columns={columns} dataSource={data} />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Col>

          <Col xs={24} md={6}>
            <Col span={24}>
              <Card>
                <Row gutter={16} type="flex" justify="center">
                  <Col xs={24} md={24}>
                    <h4 className="m-b-16">Do you want to upgrade your shop ?</h4>
                    <Button icon="plus" title="ORDER MORE" />
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24} className="m-t-16" style={{ marginBottom: 50 }}>
              <Card>
                <h4>Do you have a problem ?</h4>
                <p>Call: 082-584-5803</p>
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

export default BeaconDashboard
