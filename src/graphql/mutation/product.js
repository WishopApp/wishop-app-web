import gql from 'graphql-tag'

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $storeId: ID!
    $storeBranchId: [ID]!
    $categoryId: ID!
    $subCategoryId: ID!
    $categoryProps: [ProductCategoryPropInput]
    $subCategoryProps: [ProductSubCategoryPropInput]
    $name: String
    $price: Float
    $photoUrlList: [String]
  ) {
    createProduct(
      storeId: $storeId
      storeBranchId: $storeBranchId
      categoryId: $categoryId
      subCategoryId: $subCategoryId
      name: $name
      price: $price
      categoryProps: $categoryProps
      subCategoryProps: $subCategoryProps
      photoUrlList: $photoUrlList
    ) {
      _id
      name
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $status: PRODUCT_STATUSES!) {
    updateProduct(_id: $id, status: $status) {
      _id
      name
      status
    }
  }
`
