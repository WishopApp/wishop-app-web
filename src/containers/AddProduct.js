import React, { Component } from 'react'
import { withRouter } from 'react-static'
import { Layout, Row, Col, Card, Form, Checkbox } from 'antd'
import { Query, Mutation } from 'react-apollo'
import { find } from 'lodash'

import withLayout from '../utils/with-layout'
import Button from '../components/Form/Button'
import Input from '../components/Form/Input'
import AutoComplete from '../components/Form/AutoComplete'
import Select from '../components/Form/Select'
import ImageUpload from '../components/Form/ImageUpload'
import { CATEGORIES } from '../graphql/query/category'
import { CURRENT_USER } from '../graphql/authentication/query'
import { STORE_BRANCHES } from '../graphql/query/store-branch'
import { CREATE_PRODUCT } from '../graphql/mutation/product'
import axios from '../utils/axios-creator'

const { Content } = Layout
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

class AddProduct extends Component {
  state = {
    selectedCategory: null,
    selectedSubCategory: null,
    photo1: null,
    photo2: null,
    photo3: null,
    loading: false,
  }

  createProduct = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const categoryProps = this.state.selectedCategory.properties.map(p => {
          if (values[p.name]) {
            return {
              propId: p._id,
              value: values[p.name],
            }
          }
        })

        let subCategoryProps
        if (this.state.selectedSubCategory) {
          subCategoryProps = this.state.selectedSubCategory.properties.map(
            p => {
              if (values[p.name]) {
                return {
                  propId: p._id,
                  value: values[p.name],
                }
              }
            }
          )
        }

        try {
          this.setState({
            loading: true,
          })

          const formData = new FormData()
          formData.append('photos', this.state.photo1)
          formData.append('photos', this.state.photo2)
          formData.append('photos', this.state.photo3)

          const headers = {
            'content-type': 'multipart/form-data',
          }

          const resp = await axios.post('/upload/many', formData, headers)
          const photoUrlList = resp.data.result.map(file => file.fileLocation)

          await this.props.createProduct({
            variables: {
              name: values.name,
              storeId: this.props.currentUser.storeId,
              storeBranchId: this.state.storeBranchId,
              categoryId: this.state.selectedCategory._id,
              subCategoryId: this.state.selectedSubCategory._id,
              price: values.price,
              categoryProps,
              subCategoryProps,
              photoUrlList,
            },
          })

          this.setState({
            loading: false,
          })
          this.props.history.push('/products')
        } catch (err) {
          console.error(err)
        }
      }
    })
  }

  getCategoryDataSource = () => {
    return this.props.categories.map(c => c.name)
  }

  getSubCategoryDataSource = () => {
    if (this.state.selectedCategory.subCategories) {
      return this.state.selectedCategory.subCategories.map(s => s.name)
    }
  }

  getCategoryPropertyValues = index => {
    if (this.state.selectedCategory) {
      if (this.state.selectedCategory.properties) {
        return this.state.selectedCategory.properties[index].values.map(v => ({
          value: v,
          text: v,
        }))
      }
    }
  }

  getSubCategoryPropertyValues = index => {
    if (this.state.selectedSubCategory) {
      if (this.state.selectedSubCategory.properties) {
        return this.state.selectedSubCategory.properties[index].values.map(
          v => ({
            value: v,
            text: v,
          })
        )
      }
    }
  }

  selectCategory = async categoryName => {
    const selectedCategory = find(this.props.categories, {
      name: categoryName,
    })

    await this.setState({
      selectedCategory,
    })
  }

  selectSubCategory = subCategoryName => {
    const selectedSubCategory = find(
      this.state.selectedCategory.subCategories,
      {
        name: subCategoryName,
      }
    )

    this.setState({
      selectedSubCategory,
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
            <Card className="m-t-16" style={{ padding: 20 }}>
              <Form onSubmit={this.createProduct}>
                <Row type="flex" justify="center">
                  <Col xs={24} md={12} lg={10}>
                    <h4>PRODUCT PHOTOS</h4>
                  </Col>
                </Row>
                <Row type="flex" justify="center">
                  <FormItem>
                    {getFieldDecorator('photo1', {
                      rules: [
                        {
                          required: true,
                          message: 'Please upload product photo.',
                        },
                      ],
                    })(
                      <ImageUpload
                        name="photo1"
                        onChange={(key, value) =>
                          this.setState({ [key]: value })
                        }
                      />
                    )}
                  </FormItem>
                  {this.state.photo1 && (
                    <FormItem>
                      {getFieldDecorator('photo2', {})(
                        <ImageUpload
                          name="photo2"
                          onChange={(key, value) =>
                            this.setState({ [key]: value })
                          }
                        />
                      )}
                    </FormItem>
                  )}
                  {this.state.photo2 && (
                    <FormItem>
                      {getFieldDecorator('photo3', {})(
                        <ImageUpload
                          name="photo3"
                          onChange={(key, value) =>
                            this.setState({ [key]: value })
                          }
                        />
                      )}
                    </FormItem>
                  )}
                </Row>
                <Row type="flex" justify="center">
                  <Col xs={24} md={12} lg={10} className="m-t-16">
                    <FormItem>
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input name!',
                          },
                        ],
                      })(<Input label="NAME" placeholder="Enter name" />)}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('price', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input price!',
                          },
                        ],
                      })(
                        <Input
                          type="Number"
                          label="PRICE"
                          placeholder="Enter price"
                        />
                      )}
                    </FormItem>
                    {this.props.storeBranches && (
                      <FormItem style={{ marginBottom: 16 }}>
                        {getFieldDecorator('storeBranchId', {
                          rules: [
                            {
                              required: true,
                              message: 'Please select!',
                            },
                          ],
                        })(
                          <div>
                            <h4>AVAILABLE ON BRANCH</h4>
                            <CheckboxGroup
                              onChange={storeBranchId =>
                                this.setState({ storeBranchId })
                              }
                            >
                              <Row>
                                {this.props.storeBranches.length !== 0 &&
                                  this.props.storeBranches.map((s, index) => (
                                    <Col key={index} span={24}>
                                      <Checkbox value={s._id}>
                                        {s.name}
                                      </Checkbox>
                                    </Col>
                                  ))}
                              </Row>
                            </CheckboxGroup>
                          </div>
                        )}
                      </FormItem>
                    )}

                    <FormItem>
                      {getFieldDecorator('category', {
                        validateTrigger: 'onSelect',
                        rules: [
                          {
                            required: true,
                            message: 'Please select category!',
                          },
                        ],
                      })(
                        <AutoComplete
                          label="CATEGORY"
                          placeholder="Select Category..."
                          dataSource={this.getCategoryDataSource()}
                          onSelect={this.selectCategory}
                        />
                      )}
                    </FormItem>
                    {this.state.selectedCategory &&
                      this.state.selectedCategory.subCategories.length !==
                        0 && (
                        <FormItem>
                          {getFieldDecorator('subCategory', {
                            validateTrigger: 'onSelect',
                            rules: [
                              {
                                required: true,
                                message: 'Please select sub category!',
                              },
                            ],
                          })(
                            <AutoComplete
                              label="SUB CATEGORY"
                              placeholder="Select Sub Category..."
                              dataSource={this.getSubCategoryDataSource()}
                              onSelect={this.selectSubCategory}
                            />
                          )}
                        </FormItem>
                      )}
                    {this.state.selectedCategory &&
                      this.state.selectedCategory.properties.map((p, index) => (
                        <FormItem key={index} style={{ marginBottom: 16 }}>
                          {getFieldDecorator(p.name, {
                            rules: [
                              {
                                required: true,
                                message: 'Please select!',
                              },
                            ],
                          })(
                            <Select
                              label={p.name.toUpperCase()}
                              placeholder={`Select ${p.name}`}
                              data={this.getCategoryPropertyValues(index)}
                            />
                          )}
                        </FormItem>
                      ))}
                    {this.state.selectedSubCategory &&
                      this.state.selectedSubCategory.properties.map(
                        (p, index) => {
                          if (p.name) {
                            return (
                              <FormItem
                                key={index}
                                style={{ marginBottom: 16 }}
                              >
                                {getFieldDecorator(p.name, {
                                  rules: [
                                    {
                                      required: true,
                                      message: 'Please select!',
                                    },
                                  ],
                                })(
                                  <Select
                                    label={p.name.toUpperCase()}
                                    placeholder={`Select ${p.name}`}
                                    data={this.getSubCategoryPropertyValues(
                                      index
                                    )}
                                  />
                                )}
                              </FormItem>
                            )
                          }
                        }
                      )}
                    <FormItem style={{ marginTop: 30 }}>
                      <Button title="CREATE" loading={this.state.loading} />
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    )
  }
}

const AddProductWithForm = Form.create()(AddProduct)

const WithCategory = props => (
  <Query query={CATEGORIES}>
    {({ loading, error, data }) => {
      if (loading) return <Card loading />
      if (error) return `Error: ${error.message}`

      return <AddProductWithForm categories={data.categories} {...props} />
    }}
  </Query>
)

const WithStoreBranch = props => (
  <Query
    query={STORE_BRANCHES}
    variables={{ storeId: props.currentUser.storeId }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Card loading />
      if (error) return `Error: ${error.message}`

      return <WithCategory storeBranches={data.storeBranches} {...props} />
    }}
  </Query>
)

const WithCurrentUser = props => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading) return <Card loading />
      if (error) return `Error: ${error.message}`

      return <WithStoreBranch currentUser={data.currentUser} {...props} />
    }}
  </Query>
)

const WithCreateProduct = props => (
  <Mutation mutation={CREATE_PRODUCT}>
    {(createProduct, _) => (
      <WithCurrentUser createProduct={createProduct} {...props} />
    )}
  </Mutation>
)

export default withLayout(withRouter(WithCreateProduct), {
  department: 'product',
})
