import gql from 'graphql-tag'

export const STORE_BRANCHES = gql`
  query StoreBranches($storeId: ID) {
    storeBranches(storeId: $storeId) {
      _id
      name
    }
  }
`
