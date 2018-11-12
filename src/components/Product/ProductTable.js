import React, { Component } from 'react'
import { Link } from 'react-static'
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Switch,
  Popconfirm,
  Divider,
  Select,
} from 'antd'
import { Query, Mutation } from 'react-apollo'
import moment from 'moment'
import { adopt } from 'react-adopt'
import { connect } from 'react-redux'

import Button from '../Form/Button'
import { PRODUCTS, PRODUCT_STATISTIC } from '../../graphql/query/product'
import { UPDATE_PRODUCT } from '../../graphql/mutation/product'
import { UPDATE_STORE } from '../../graphql/mutation/store'
import { STORE } from '../../graphql/query/store'
import ExmaplePhoto from '../Form/ExmaplePhoto'

const { Option } = Select

const updateProduct = ({ render }) => (
  <Mutation mutation={UPDATE_PRODUCT}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const updatePromotion = ({ render }) => (
  <Mutation mutation={UPDATE_STORE}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const Compose = adopt({
  updateProduct,
  updatePromotion,
})

class ProductTable extends Component {
  state = {
    mode: 'product',
  }

  getProductColumns = functions => [
    {
      title: 'EXAMPLE PHOTO',
      dataIndex: 'photoUrlList',
      key: 'photoUrlList',
      render: photoUrlList => <ExmaplePhoto img={photoUrlList[0]} />,
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      key: 'category',
      render: category => <p>{category.name}</p>,
    },
    {
      title: 'SUB CATEGORY',
      dataIndex: 'subCategory',
      key: 'subCategory',
      render: subCategory => (subCategory ? <p>{subCategory.name}</p> : ''),
    },
    {
      title: 'REGISTERED AT',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: createdAt => (
        <div>
          {moment(createdAt).format('DD-MM-YYYY')}
          <br />
          {moment(createdAt).format('HH:mm')}
        </div>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      align: 'center',
      render: status =>
        status === 'AVAILABLE' ? (
          <Badge status="success" text="Available" />
        ) : (
          <Badge status="error" text="Out of stock" />
        ),
    },
    {
      title: '',
      dataIndex: 'Operation',
      key: 'Operation',
      align: 'center',
      render: (text, record) => (
        <Row>
          <p className="m-b-16">STATUS AVAILABLE</p>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() =>
              functions.onUpdateProduct(
                record._id,
                record.status === 'AVAILABLE'
              )
            }
            okText="Yes"
            cancelText="No"
          >
            <Switch
              className="m-b-16"
              checked={record.status === 'AVAILABLE'}
            />
          </Popconfirm>
          <br />
          <a className="m-b-16">DETAIL</a>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure?"
            onConfirm={() =>
              functions.onDeleteProduct(record._id, functions.productRefetch)
            }
            okText="Yes"
            cancelText="No"
          >
            <a className="m-b-16">DELETE</a>
          </Popconfirm>
        </Row>
      ),
    },
  ]

  getPromotionColumns = functions => [
    {
      title: 'PROMOTION',
      dataIndex: 'promotion',
      key: 'promotion',
      render: promotion => (
        <ExmaplePhoto img={promotion} height="150" width="300" />
      ),
    },
    {
      title: '',
      dataIndex: 'Operation',
      key: 'Operation',
      align: 'center',
      render: (text, record, index) => (
        <Row>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => functions.onDeletePromotion(index)}
            okText="Yes"
            cancelText="No"
          >
            <a className="m-b-16">DELETE</a>
          </Popconfirm>
        </Row>
      ),
    },
  ]

  render() {
    return (
      <Compose>
        {({ updateProduct, updatePromotion }) => {
          const onUpdateProduct = async (id, isAvailable, productRefetch) => {
            try {
              let status = 'OUT_OF_STOCK'
              if (!isAvailable) {
                status = 'AVAILABLE'
              }
              await updateProduct.mutation({ variables: { id, status } })
              productRefetch()
            } catch (err) {
              console.error(err.message)
            }
          }

          const onDeleteProduct = async (id, productRefetch) => {
            try {
              await updateProduct.mutation({
                variables: { id, status: 'DELETE' },
              })
              productRefetch()
            } catch (err) {
              console.error(err.message)
            }
          }

          const onDeletePromotion = async (
            promotions,
            index,
            promotionRefetch
          ) => {
            try {
              promotions.splice(index, 1)
              await updatePromotion.mutation({
                variables: {
                  id: this.props.currentUser.storeId,
                  promotions,
                },
              })
              promotionRefetch()
            } catch (err) {
              console.error(err.message)
            }
          }

          if (!this.props.currentUser) {
            return <Card loading />
          }

          return (
            <Row gutter={16}>
              <Col xs={24} md={6} className="m-b-16">
                <Card className="m-b-16">
                  <h4 className="m-b-16">SELECT TABLE</h4>
                  <Select
                    defaultValue="product"
                    style={{ width: '100%' }}
                    onChange={value => this.setState({ mode: value })}
                  >
                    <Option value="product">Product</Option>
                    <Option value="promotion">Promotion</Option>
                  </Select>
                </Card>
                <Card>
                  <Row className="m-b-16">
                    <h4>PRODUCTS</h4>
                  </Row>
                  <Row type="flex" justify="center" align="middle">
                    <Link to="/products/new" className="m-b-16">
                      <Button title="ADD NEW PRODUCT" icon="plus" />
                    </Link>
                  </Row>
                  <Row className="m-b-16">
                    <h4>PROMOTION</h4>
                  </Row>
                  <Row type="flex" justify="center" align="middle">
                    <Link to="/promotion/new">
                      <Button title="PROMOTION SETTING" icon="setting" />
                    </Link>
                  </Row>
                </Card>
              </Col>
              <Col xs={24} md={18}>
                <Card>
                  <Row>
                    {this.state.mode === 'product' && (
                      <Query
                        query={PRODUCT_STATISTIC}
                        variables={{ storeId: this.props.currentUser.storeId }}
                      >
                        {({ loading, error, data }) => {
                          if (loading) return <Card loading />
                          if (error) return `Error: ${error.message}`

                          return (
                            <Row gutter={16}>
                              <Col span={8}>
                                <Card>
                                  <h4>AVAILABLE</h4>
                                  <h3>{data.productStatistic.available}</h3>
                                </Card>
                              </Col>
                              <Col span={8}>
                                <Card>
                                  <h4>OUT OF STOCK</h4>
                                  <h3>{data.productStatistic.outOfStock}</h3>
                                </Card>
                              </Col>
                              <Col span={8}>
                                <Card>
                                  <h4>TOTAL</h4>
                                  <h3>{data.productStatistic.total}</h3>
                                </Card>
                              </Col>
                            </Row>
                          )
                        }}
                      </Query>
                    )}

                    <Col span={24} className="m-t-16">
                      {this.state.mode === 'product' && (
                        <Query
                          query={PRODUCTS}
                          variables={{
                            storeId: this.props.currentUser.storeId,
                          }}
                        >
                          {({ loading, error, data, refetch }) => {
                            if (loading) return <Card loading />
                            if (error) return `Error: ${error.message}`

                            return (
                              <Table
                                columns={this.getProductColumns({
                                  onUpdateProduct,
                                  onDeleteProduct,
                                  productRefetch: refetch,
                                })}
                                dataSource={data.products}
                              />
                            )
                          }}
                        </Query>
                      )}

                      {this.state.mode === 'promotion' && (
                        <Query
                          query={STORE}
                          variables={{ id: this.props.currentUser.storeId }}
                        >
                          {({ loading, error, data, refetch }) => {
                            if (loading) return 'Loading...'
                            if (error) return `Error: ${error.message}`

                            const promotions = data.store.promotions.map(
                              promotion => ({ promotion })
                            )

                            return (
                              <Table
                                columns={this.getPromotionColumns({
                                  onDeletePromotion: index =>
                                    onDeletePromotion(
                                      data.store.promotions,
                                      index,
                                      refetch
                                    ),
                                })}
                                dataSource={promotions}
                              />
                            )
                          }}
                        </Query>
                      )}
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          )
        }}
      </Compose>
    )
  }
}

const ProductTableWithStore = connect(
  ({ user }) => ({
    currentUser: user.currentUser,
  }),
  null
)(ProductTable)

export default ProductTableWithStore
