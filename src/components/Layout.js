import React, { Component } from 'react'
import { withRouter } from 'react-static'
import { Layout, Divider } from 'antd'
import styled from 'styled-components'

import MobileMenu from './MobileMenu'
import UserBar from './UserBar'
import DesktopMenu from './DesktopMenu'

const { Header, Content } = Layout

const ContentWrapper = styled(Content)`
  padding: 50px;

  @media screen and (max-width: 767px) {
    padding: 0px;
  }
`

class AppLayout extends Component {
  changePage = route => {
    this.props.history.push(route)
  }

  getKey = () => {
    const listOfKeys = {
      dashboard: '1',
      product: '2',
      beacon: '3',
      staff: '4',
      profile: '5',
    }

    return listOfKeys[this.props.pageDetail.department]
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <UserBar />
        </Header>
        <Divider style={{ margin: 0, background: '#f9f9f9' }} />
        <DesktopMenu getKey={this.getKey} changePage={this.changePage} />
        <ContentWrapper>
          <Layout>{this.props.children}</Layout>
          <MobileMenu />
        </ContentWrapper>
      </Layout>
    )
  }
}

export default withRouter(AppLayout)
