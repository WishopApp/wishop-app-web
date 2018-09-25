import React, { Component } from 'react'
import { Row, Col, Card, Modal } from 'antd'

import Logo from '../../../public/logo/app-logo-no-title.svg'
import Button from '../Form/Button'
import Input from '../Form/Input'

class StepGuide extends Component {
  state = {
    visible: false,
    storeType: 'DEMO',
    phoneNumber: '',
  }

  render() {
    return (
      <Col span={24}>
        <Card className="m-t-16">
          <Row gutter={16} type="flex" justify="center">
            <Col xs={24} md={24} style={{ marginTop: 50 }}>
              <Row type="flex" justify="center">
                <img src={Logo} alt="logo" style={{ height: 100 }} />
              </Row>
              <Row type="flex" justify="center" className="m-t-16">
                <h3>MAIN STEP HEADER</h3>
              </Row>
            </Col>
            <Col xs={24} md={8} style={{ marginTop: 50 }}>
              <Row type="flex" justify="center">
                <img src={Logo} alt="logo" style={{ height: 100 }} />
              </Row>
              <Row type="flex" justify="center" className="m-t-16">
                <h4>STEP 1</h4>
              </Row>
            </Col>
            <Col xs={24} md={8} style={{ marginTop: 50 }}>
              <Row type="flex" justify="center">
                <img src={Logo} alt="logo" style={{ height: 100 }} />
              </Row>
              <Row type="flex" justify="center" className="m-t-16">
                <h4>STEP 2</h4>
              </Row>
            </Col>
            <Col xs={24} md={8} style={{ marginTop: 50 }}>
              <Row type="flex" justify="center">
                <img src={Logo} alt="logo" style={{ height: 100 }} />
              </Row>
              <Row type="flex" justify="center" className="m-t-16">
                <h4>STEP 3</h4>
              </Row>
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: 50 }}>
            <Col xs={24} md={6} className="m-t-16">
              <Button title="ORDER BEACON" onClick={() => this.setState({ visible: true })} />
            </Col>
          </Row>
        </Card>

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

export default StepGuide
