import gql from 'graphql-tag'

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      _id
      storeId
      profile {
        name
      }
    }
  }
`
