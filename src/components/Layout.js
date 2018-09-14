import React, { Component } from 'react'
import { withRouter, Link } from 'react-static'
import { Layout, Menu, Row, Avatar, Dropdown, Icon, Divider } from 'antd'
import { injectGlobal } from 'styled-components'
import styled from 'styled-components'

import Logo from '../../public/logo/app-logo-inline-text.svg'

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
    background: #f9f9f9;
  }
`

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/logout">
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: 40, padding: '0 10px' }}
        >
          <h5>
            <Icon type="logout" theme="outlined" style={{ marginRight: 10 }} />{' '}
            LOGOUT
          </h5>
        </Row>
      </Link>
    </Menu.Item>
  </Menu>
)

const Bar = styled(Row)`
  background: #fff;
  color: #000;
`

const UserBar = props => (
  <Bar type="flex" justify="space-between">
    <img src={Logo} alt="logo" height="30" style={{ margin: 'auto 0' }} />
    <Row type="flex" align="middle">
      <Avatar icon="user" style={{ marginRight: 10 }} />
      <Dropdown overlay={menu}>
        <p style={{ cursor: 'pointer' }}>
          Username <Icon type="down" />
        </p>
      </Dropdown>
    </Row>
  </Bar>
)

const SecondBar = styled(Header)`
  box-shadow: 0px 6px 15px -4px #00000030;
  z-index: 99;
  height: 66px;
`

class AppLayout extends Component {
  changePage = route => {
    this.props.history.push(route)
  }

  getKey = () => {
    const listOfKeys = {
      dashboard: '1',
      product: '2',
      beacon: '3'
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
        <SecondBar>
          <div className="logo" />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[this.getKey()]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1" onClick={() => this.changePage('/')}>
              DASHBOARD
            </Menu.Item>
            <Menu.Item key="2" onClick={() => this.changePage('/products')}>
              PRODUCTS
            </Menu.Item>
            <Menu.Item key="3" onClick={() => this.changePage('/beacons')}>
              BEACONS
            </Menu.Item>
          </Menu>
        </SecondBar>
        <Content style={{ padding: 50 }}>
          <Layout>{this.props.children}</Layout>
        </Content>
      </Layout>
    )
  }
}

export default withRouter(AppLayout)
