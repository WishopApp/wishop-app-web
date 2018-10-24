import gql from 'graphql-tag'

export const PRODUCTS = gql`
  query Products($storeId: ID) {
    products(storeId: $storeId) {
      _id
      name
      category {
        name
      }
      subCategory {
        name
      }
      status
      photoUrlList
    }
  }
`

export const PRODUCT_STATISTIC = gql`
  query ProductStatistic($storeId: ID!) {
    productStatistic(storeId: $storeId) {
      available
      outOfStock
      total
    }
  }
`
