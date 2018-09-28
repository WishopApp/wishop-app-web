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
  ) {
    createProduct(
      storeId: $storeId
      storeBranchId: $storeBranchId
      categoryId: $categoryId
      subCategoryId: $subCategoryId
      name: $name
      categoryProps: $categoryProps
      subCategoryProps: $subCategoryProps
    ) {
      _id
      name
    }
  }
`
