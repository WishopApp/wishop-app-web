import React, { Component } from 'react'
import { Link } from 'react-static'
import { Layout, Row, Col, Card, Form } from 'antd'

import withLayout from '../utils/with-layout'
import Button from '../components/Form/Button'
import BackButton from '../components/Form/BackButton'
import Input from '../components/Form/Input'
import AutoComplete from '../components/Form/AutoComplete'
import Select from '../components/Form/Select'

const { Content } = Layout
const FormItem = Form.Item

class AddProduct extends Component {
  createProduct = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        console.log('Create !!')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <Row className="m-t-16">
              <h3>NEW PRODUCT</h3>
            </Row>
          </Col>
          <Col span={24}>
            <Card className="m-t-16">
              <Row>
                <Col xs={12} md={6} lg={2}>
                  <Link to="/products">
                    <BackButton title="BACK" icon="left" />
                  </Link>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col xs={24} md={12} lg={6} className="m-t-16">
                  <Form onSubmit={this.createProduct}>
                    <FormItem>
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input name!',
                          },
                        ],
                      })(<Input label="Name" placeholder="Enter name" />)}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('category', {
                        rules: [
                          {
                            required: true,
                            message: 'Please select category!',
                          },
                        ],
                      })(<AutoComplete label="Category" placeholder="Select Category..." />)}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('subCategory', {
                        rules: [
                          {
                            required: true,
                            message: 'Please select sub category!',
                          },
                        ],
                      })(
                        <AutoComplete label="Sub Category" placeholder="Select Sub Category..." />,
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('size', {
                        rules: [
                          {
                            required: true,
                            message: 'Please select sub category!',
                          },
                        ],
                      })(
                        <Select
                          label="Size"
                          placeholder="Select size..."
                          data={[{ value: '12', text: 12 }]}
                        />,
                      )}
                    </FormItem>
                    <FormItem style={{ marginTop: 30 }}>
                      <Button title="CREATE" />
                    </FormItem>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    )
  }
}

const AddProductWithForm = Form.create()(AddProduct)

export default withLayout(AddProductWithForm, { department: 'product' })
