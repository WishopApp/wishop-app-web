import gql from 'graphql-tag'

export const CREATE_STORE = gql`
  mutation CreateStore(
    $ownerId: ID!
    $name: String!
    $coverUrl: String
    $avatarUrl: String
    $description: String
  ) {
    createStore(
      ownerId: $ownerId
      name: $name
      coverUrl: $coverUrl
      avatarUrl: $avatarUrl
      description: $description
    ) {
      _id
    }
  }
`
