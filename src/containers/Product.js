import React, { Component } from 'react'
import { Link } from 'react-static'
import { Layout, Row, Col, Card, Icon, Avatar } from 'antd'

import withLayout from '../utils/with-layout'
import Button from '../components/Form/Button'

const { Content } = Layout
const { Meta } = Card

class Product extends Component {
  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>PRODUCT</h3>
          </Col>
          <Col span={24}>
            <Card className="m-t-16">
              <Row type="flex" justify="center" align="middle">
                <Link to="/products/new">
                  <Button title="ADD NEW" icon="plus" />
                </Link>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Row gutter={16}>
              <Col md={6} lg={4}>
                <Card
                  className="m-t-16"
                  cover={
                    <img
                      alt="example"
                      src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1eb1248f153f1fe243de6e216303be95&auto=format&fit=crop&w=1350&q=80"
                    />
                  }
                  actions={[<Icon type="edit" />]}
                >
                  <Row>
                    <h4>Product name</h4>
                  </Row>
                </Card>
              </Col>
              <Col md={6} lg={4}>
                <Card
                  className="m-t-16"
                  cover={
                    <img
                      alt="example"
                      src="https://images.unsplash.com/photo-1535134679254-fd83eaf030db?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5f8628e47462d3d9efb5ee72b362fc61&auto=format&fit=crop&w=634&q=80"
                    />
                  }
                  actions={[<Icon type="edit" />]}
                >
                  <Row>
                    <h4>Product name</h4>
                  </Row>
                </Card>
              </Col>
              <Col md={6} lg={4}>
                <Card
                  className="m-t-16"
                  cover={
                    <img
                      alt="example"
                      src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3b0dad6307f4db24e9d52d0140adab06&auto=format&fit=crop&w=634&q=80"
                    />
                  }
                  actions={[<Icon type="edit" />]}
                >
                  <Row>
                    <h4>Product name</h4>
                  </Row>
                </Card>
              </Col>
              <Col md={6} lg={4}>
                <Card
                  className="m-t-16"
                  cover={
                    <img
                      alt="example"
                      src="https://images.unsplash.com/photo-1508061562735-7b4dabf32202?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=17674dffafeea5fc3d29bfc791c723ca&auto=format&fit=crop&w=1489&q=80"
                    />
                  }
                  actions={[<Icon type="edit" />]}
                >
                  <Row>
                    <h4>Product name</h4>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    )
  }
}

export default withLayout(Product, { department: 'product' })
