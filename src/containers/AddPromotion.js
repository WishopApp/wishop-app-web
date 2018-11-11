import React, { Component } from 'react'
import { withRouter } from 'react-static'
import { Layout, Row, Col, Card, Form } from 'antd'
import { Mutation, Query } from 'react-apollo'
import { connect } from 'react-redux'
import { adopt } from 'react-adopt'

import withLayout from '../utils/with-layout'
import Button from '../components/Form/Button'
import PromotionUpload from '../components/Form/PromotionUpload'
import { UPDATE_STORE } from '../graphql/mutation/store'
import { STORE } from '../graphql/query/store'
import axios from '../utils/axios-creator'

const { Content } = Layout
const FormItem = Form.Item

const updateStore = ({ render }) => (
  <Mutation mutation={UPDATE_STORE}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const Composed = adopt({
  updateStore,
})

class AddPromotion extends Component {
  state = {
    photo0: null,
    photo1: null,
    photo2: null,
    oldPromotions: ['', '', ''],
    loading: false,
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Composed>
        {({ updateStore }) => {
          const onUpdateStore = async (e, oldPromotions) => {
            e.preventDefault()
            try {
              this.setState({ loading: true })

              const formData = new FormData()
              formData.append('photos', this.state.photo0)
              formData.append('photos', this.state.photo1)
              formData.append('photos', this.state.photo2)

              const headers = { 'content-type': 'multipart/form-data' }

              const resp = await axios.post('/upload/many', formData, headers)
              const promotions = resp.data.result.map(file => file.fileLocation)
              const storeId = this.props.currentUser.storeId

              if (this.state.photo0) {
                oldPromotions[0] = promotions[0]
              }

              if (this.state.photo1) {
                if (promotions.length === 3) {
                  oldPromotions[1] = promotions[1]
                } else {
                  oldPromotions[1] = promotions[0]
                }
              }

              if (this.state.photo2) {
                if (promotions.length === 3) {
                  oldPromotions[2] = promotions[2]
                } else if (promotions.length === 2) {
                  oldPromotions[2] = promotions[1]
                } else {
                  oldPromotions[2] = promotions[0]
                }
              }

              await updateStore.mutation({
                variables: {
                  id: storeId,
                  promotions: oldPromotions,
                },
              })

              this.setState({ loading: false })
              this.props.history.push('/products')
            } catch (err) {
              console.error(err)
            }
          }

          if (!this.props.currentUser) {
            return <Card loading />
          }

          return (
            <Content style={{ padding: 16 }}>
              <Row gutter={16}>
                <Col span={24}>
                  <Row className="m-t-16">
                    <h3>PROMOTIONS SETTING</h3>
                  </Row>
                </Col>
                <Col span={24}>
                  <Query
                    query={STORE}
                    variables={{ id: this.props.currentUser.storeId }}
                    fetchPolicy="network-only"
                  >
                    {({ loading, error, data }) => {
                      if (loading) return <Card loading />
                      if (error) return `Error: ${error.message}`

                      return (
                        <Card className="m-t-16" style={{ padding: 20 }}>
                          <Form
                            onSubmit={e =>
                              onUpdateStore(e, data.store.promotions)
                            }
                          >
                            <Row type="flex" justify="center">
                              <Col xs={24} md={12} lg={10}>
                                <h4>UPLOAD PROMOTION PHOTOS</h4>
                                <h5 style={{ color: '#b1b1b1' }}>
                                  One store can only upload 3 promotions.
                                </h5>
                              </Col>
                            </Row>

                            <div>
                              <Row type="flex" justify="center">
                                <FormItem>
                                  {getFieldDecorator('photo0', {})(
                                    <PromotionUpload
                                      name="photo0"
                                      img={data.store.promotions[0]}
                                      onChange={(key, value) =>
                                        this.setState({ [key]: value })
                                      }
                                    />
                                  )}
                                </FormItem>
                              </Row>
                              <Row type="flex" justify="center">
                                <FormItem>
                                  {getFieldDecorator('photo1', {})(
                                    <PromotionUpload
                                      name="photo1"
                                      img={data.store.promotions[1]}
                                      onChange={(key, value) =>
                                        this.setState({ [key]: value })
                                      }
                                    />
                                  )}
                                </FormItem>
                              </Row>
                              <Row type="flex" justify="center">
                                <FormItem>
                                  {getFieldDecorator('photo2', {})(
                                    <PromotionUpload
                                      name="photo2"
                                      img={data.store.promotions[2]}
                                      onChange={(key, value) =>
                                        this.setState({ [key]: value })
                                      }
                                    />
                                  )}
                                </FormItem>
                              </Row>
                            </div>

                            <Row type="flex" justify="center">
                              <Col xs={24} md={12} lg={10} className="m-t-16">
                                <FormItem style={{ marginTop: 30 }}>
                                  <Button
                                    title="SAVE"
                                    loading={this.state.loading}
                                  />
                                </FormItem>
                              </Col>
                            </Row>
                          </Form>
                        </Card>
                      )
                    }}
                  </Query>
                </Col>
              </Row>
            </Content>
          )
        }}
      </Composed>
    )
  }
}

const AddPromotionWithStore = connect(
  ({ user }) => ({
    currentUser: user.currentUser,
  }),
  null
)(AddPromotion)

const PromotionWithForm = Form.create()(AddPromotionWithStore)

export default withLayout(withRouter(PromotionWithForm), {
  department: 'product',
})
