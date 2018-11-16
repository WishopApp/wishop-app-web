import gql from 'graphql-tag'

export const STORE_BRANCH_STATISTIC = gql`
  query StoreBranchStatistic($storeBranchId: ID!) {
    storeBranchStatistic(storeBranchId: $storeBranchId) {
      _id
      storeBranchId
      reachCount {
        date
        hours
      }
      categoryRanking {
        categoryId
        count
        category {
          name
          logo
        }
      }
    }
  }
`
