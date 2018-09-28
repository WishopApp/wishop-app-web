import React, { Component } from 'react'
import { Link } from 'react-static'
import { Row, Col, Card, Modal, Table, Badge, Divider } from 'antd'
import { Query } from 'react-apollo'

import Button from '../Form/Button'
import { PRODUCTS, PRODUCT_STATISTIC } from '../../graphql/query/product'
import { CURRENT_USER } from '../../graphql/authentication/query'

class ProductTable extends Component {
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: category => <p>{category.name}</p>,
      },
      {
        title: 'Sub Category',
        dataIndex: 'subCategory',
        key: 'subCategory',
        render: subCategory => (subCategory ? <p>{subCategory.name}</p> : ''),
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
        render: status =>
          status === 'AVAILABLE' ? (
            <Badge status="success" text="Available" />
          ) : (
            <Badge status="error" text="Out of stock" />
          ),
      },
    ]

    return (
      <Row gutter={16}>
        <Col xs={24} md={6} className="m-b-16">
          <Card>
            <Row type="flex" justify="center" align="middle">
              <Link to="/products/new">
                <Button title="ADD NEW PRODUCT" icon="plus" />
              </Link>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <Card>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <h4>AVAILABLE</h4>
                  <h3>{this.props.productStatistic.available}</h3>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <h4>OUT OF STOCK</h4>
                  <h3>{this.props.productStatistic.outOfStock}</h3>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <h4>TOTAL</h4>
                  <h3>{this.props.productStatistic.total}</h3>
                </Card>
              </Col>
              <Col span={24} className="m-t-16">
                <Table columns={columns} dataSource={this.props.products} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}

const WithProductStatistic = props => (
  <Query
    query={PRODUCT_STATISTIC}
    variables={{ storeId: props.currentUser.storeId }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Card loading />
      if (error) return `Error: ${error.message}`

      return (
        <ProductTable productStatistic={data.productStatistic} {...props} />
      )
    }}
  </Query>
)

const WithProductQuery = props => (
  <Query query={PRODUCTS} variables={{ storeId: props.currentUser.storeId }}>
    {({ loading, error, data }) => {
      if (loading) return <Card loading />
      if (error) return `Error: ${error.message}`

      return <WithProductStatistic products={data.products} {...props} />
    }}
  </Query>
)

const WithCurrentUser = props => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading) return <Card loading />
      if (error) return `Error: ${error.message}`

      return <WithProductQuery currentUser={data.currentUser} {...props} />
    }}
  </Query>
)

export default WithCurrentUser
