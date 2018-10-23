import React, { Component } from 'react'
import { withRouter } from 'react-static'
import { Row, Col, Card, Layout } from 'antd'

import withLayout from '../utils/with-layout'
import Image from '../components/Utility/Image'

const { Content } = Layout

class ProductDetail extends Component {
  render() {
    return (
      <Content style={{ padding: 16 }}>
        <Row>
          <Col xs={24}>
            <h4>PRODUCT DETAIL</h4>
          </Col>
          <Col md={24} className="m-t-16">
            <Row>
              <Col xs={24}>
                <Card>
                  <Row gutter={16} type="flex" justify="center">
                    <Col xs={12} md={4} className="m-b-16">
                      <Image
                        height="300px"
                        width="100%"
                        img="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1eb1248f153f1fe243de6e216303be95&auto=format&fit=crop&w=1350&q=80"
                      />
                    </Col>
                    <Col xs={12} md={4} className="m-b-16">
                      <Image
                        height="300px"
                        width="100%"
                        img="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1eb1248f153f1fe243de6e216303be95&auto=format&fit=crop&w=1350&q=80"
                      />
                    </Col>{' '}
                    <Col xs={12} md={4} className="m-b-16">
                      <Image
                        height="300px"
                        width="100%"
                        img="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1eb1248f153f1fe243de6e216303be95&auto=format&fit=crop&w=1350&q=80"
                      />
                    </Col>{' '}
                    <Col xs={12} md={4} className="m-b-16">
                      <Image
                        height="300px"
                        width="100%"
                        img="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1eb1248f153f1fe243de6e216303be95&auto=format&fit=crop&w=1350&q=80"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={12} className="m-t-16">
            <Card>
              <h3>Name:</h3>
              <p>Product Name</p>
            </Card>
          </Col>
        </Row>
      </Content>
    )
  }
}

export default withLayout(withRouter(ProductDetail), { department: 'product' })
