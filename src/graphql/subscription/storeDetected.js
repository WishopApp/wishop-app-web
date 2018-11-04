import gql from 'graphql-tag'

export const STORE_DETECTED = gql`
  subscription($storeBranchId: ID!) {
    storeDetected(storeBranchId: $storeBranchId) {
      _id
      name
      category {
        logo
        name
      }
      subCategory {
        name
      }
    }
  }
`
