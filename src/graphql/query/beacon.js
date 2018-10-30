import gql from 'graphql-tag'

export const BEACONS = gql`
  query Beacons($assignId: ID) {
    beacons(assignId: $assignId) {
      name
      status
      type
      createdAt
    }
  }
`
