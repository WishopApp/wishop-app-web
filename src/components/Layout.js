import React, { Component } from 'react'
import { withRouter } from 'react-static'
import { Layout, Menu } from 'antd'
import { injectGlobal } from 'styled-components'

const { Header, Content } = Layout

injectGlobal`
  .ant-layout-header {
    background: #fff;
  }

  .ant-menu-item {
    color: #000;
  }

  .ant-layout-content {
    min-height: 100vh;
    background: #fdfdfd;
  }
`

class AppLayout extends Component {
  componentWillMount() {
    this.props.history.push('/login')
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">DASHBOARD</Menu.Item>
            <Menu.Item key="2">PRODUCTS</Menu.Item>
            <Menu.Item key="3">BEACONS</Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Layout>{this.props.children}</Layout>
        </Content>
      </Layout>
    )
  }
}

export default withRouter(AppLayout)
