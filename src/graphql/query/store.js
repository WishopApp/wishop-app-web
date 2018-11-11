import gql from 'graphql-tag'

export const STORE = gql`
  query Store($id: ID!) {
    store(_id: $id) {
      _id
      name
      avatarUrl
      description
      promotions
    }
  }
`
