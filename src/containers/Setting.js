import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Col, Row, Card, Form } from 'antd'
import { Query } from 'react-apollo'

import withLayout from '../utils/with-layout'
import ImageUpload from '../components/Form/ImageUpload'
import Input from '../components/Form/Input'
import TextArea from '../components/Form/TextArea'
import Button from '../components/Form/Button'
import { STORE } from '../graphql/query/store'

const { Content } = Layout
const FormItem = Form.Item

class Setting extends Component {
  state = {
    loading: false,
  }

  render() {
    const { getFieldDecorator } = this.props.form

    if (!this.props.currentUser) {
      return <Card loading />
    }

    return (
      <Content style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={24}>
            <h3>SETTING</h3>
          </Col>
          <Col xs={24} md={24}>
            <Card className="m-t-16">
              <Query
                query={STORE}
                variables={{ id: this.props.currentUser.storeId }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <Card loading />
                  if (error) return `Error: ${error.message}`

                  return (
                    <Row type="flex" justify="center">
                      <div style={{ width: 600 }}>
                        <h4>SHOP AVATAR</h4>
                        <FormItem>
                          {getFieldDecorator('avatar', {
                            initialValue: data.store.avatarUrl,
                            rules: [
                              {
                                required: true,
                                message: 'Please upload.',
                              },
                            ],
                          })(
                            <Row type="flex" justify="center">
                              <ImageUpload
                                name="avatar"
                                img={data.store.avatarUrl}
                                onChange={(key, value) =>
                                  this.setState({ [key]: value })
                                }
                              />
                            </Row>
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('name', {
                            initialValue: data.store.name,
                            rules: [
                              {
                                required: true,
                                message: 'Please enter store name.',
                              },
                            ],
                          })(<Input label="NAME" placeholder="Enter name" />)}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('description', {
                            initialValue: data.store.description,
                            rules: [
                              {
                                required: true,
                                message: 'Please enter store description.',
                              },
                            ],
                          })(
                            <TextArea
                              label="DESCRIPTION"
                              type="text"
                              rows={8}
                            />
                          )}
                        </FormItem>
                        <FormItem style={{ marginTop: 30 }}>
                          <Button title="UPDATE" loading={this.state.loading} />
                        </FormItem>
                      </div>
                    </Row>
                  )
                }}
              </Query>
            </Card>
          </Col>
        </Row>
      </Content>
    )
  }
}

const SettingWithStore = connect(
  ({ user }) => ({
    currentUser: user.currentUser,
  }),
  null
)(Setting)

const SettingWithForm = Form.create()(SettingWithStore)

export default withLayout(SettingWithForm, { department: 'setting' })