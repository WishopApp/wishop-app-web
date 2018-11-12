import gql from 'graphql-tag'

export const CREATE_BRANCH = gql`
  mutation createBranch(
    $storeId: ID!
    $name: String!
    $staffUsername: String!
    $staffPassword: String!
    $telNo: String!
  ) {
    createStoreBranch(
      storeId: $storeId
      name: $name
      staffUsername: $staffUsername
      staffPassword: $staffPassword
      telNo: $telNo
    ) {
      _id
    }
  }
`
