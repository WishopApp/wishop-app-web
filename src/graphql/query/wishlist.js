import gql from 'graphql-tag'

export const WISHLIST = gql`
  query wishlist($id: ID!) {
    wishlist(_id: $id) {
      categoryProps {
        _id
        name
        value
      }
      subCategoryProps {
        _id
        name
        value
      }
    }
  }
`
