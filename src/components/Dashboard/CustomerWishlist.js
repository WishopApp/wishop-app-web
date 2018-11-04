import React from 'react'
import { Row, Col } from 'antd'
import { Query } from 'react-apollo'

import { WISHLIST } from '../../graphql/query/wishlist'

const NoInformationText = () => (
  <Row type="flex" justify="center" className="m-t-16">
    No information provided
  </Row>
)

const WishlistProperties = props => (
  <Query query={WISHLIST} variables={{ id: props.wishlist._id }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return <NoInformationText />

      const categoryProps = data.wishlist.categoryProps
      const subCategoryProps = data.wishlist.subCategoryProps
      const isNoInformation =
        categoryProps.length === 0 && subCategoryProps.length === 0

      return (
        <div>
          {categoryProps.length !== 0 &&
            categoryProps.map((cp, index) => (
              <div key={index}>
                <Row type="flex" justify="space-between">
                  <h4 className="m-t-16">{cp.name}</h4>
                  <h4 className="m-t-16">{cp.value}</h4>
                </Row>
              </div>
            ))}
          {subCategoryProps.length !== 0 &&
            subCategoryProps.map((scp, index) => (
              <div key={index}>
                <Row type="flex" justify="space-between">
                  <h4 className="m-t-16">{scp.name}</h4>
                  <h4 className="m-t-16">{scp.value}</h4>
                </Row>
              </div>
            ))}
          {isNoInformation && <NoInformationText />}
        </div>
      )
    }}
  </Query>
)

const CustomerWishlist = props => (
  <Col md={4}>
    <Row type="flex" justify="center">
      <img src={props.wishlist.category.logo} alt="" height="50" />
    </Row>
    <Row type="flex" justify="center">
      <h4 className="m-t-16">{props.wishlist.category.name}</h4>
    </Row>
    <Row type="flex" justify="center">
      <h4>{props.wishlist.subCategory.name}</h4>
    </Row>
    <WishlistProperties wishlist={props.wishlist} />
  </Col>
)

export default CustomerWishlist
