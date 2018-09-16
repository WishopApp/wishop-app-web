import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import styled from 'styled-components'

import beacon from '../../public/logo/beacon.png'
import dashboard from '../../public/logo/dashboard.png'
import staff from '../../public/logo/staff.png'
import product from '../../public/logo/product.png'

const { Header } = Layout

const SecondBar = styled(Header)`
  box-shadow: 0px 6px 15px -4px #00000030;
  z-index: 99;
  height: 66px;

  @media screen and (max-width: 767px) {
    display: none;
  }
`

export default class DesktopMenu extends Component {
  render() {
    return (
      <SecondBar>
        <div className="logo" />
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[this.props.getKey()]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1" onClick={() => this.props.changePage('/')}>
            <img
              height="30"
              src={dashboard}
              alt="dashboard"
              className="m-r-16"
            />
            DASHBOARD
          </Menu.Item>
          <Menu.Item key="2" onClick={() => this.props.changePage('/products')}>
            <img height="30" src={product} alt="product" className="m-r-16" />
            PRODUCT
          </Menu.Item>
          <Menu.Item key="3" onClick={() => this.props.changePage('/beacons')}>
            <img height="30" src={beacon} alt="beacon" className="m-r-16" />
            BEACON
          </Menu.Item>
          <Menu.Item key="4" onClick={() => this.props.changePage('/staffs')}>
            <img height="30" src={staff} alt="staff" className="m-r-16" />
            STAFF
          </Menu.Item>
        </Menu>
      </SecondBar>
    )
  }
}
