import gql from 'graphql-tag'

export const CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
      properties {
        _id
        name
        values
      }
      subCategories {
        _id
        name
        properties {
          _id
          name
          values
        }
      }
    }
  }
`
