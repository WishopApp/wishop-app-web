import React, { Component } from 'react'

import Layout from 'components/Layout'

const withLayout = (Components, pageDetail = {}) => {
  class LayoutContainer extends Component {
    render() {
      return (
        <Layout pageDetail={pageDetail}>
          <Components />
        </Layout>
      )
    }
  }

  return LayoutContainer
}

export default withLayout
