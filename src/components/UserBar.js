import React, { Component } from 'react'
import { Link, withRouter } from 'react-static'
import { Menu, Row, Icon, Avatar, Dropdown } from 'antd'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'

import Logo from '../../public/logo/app-logo-inline-text.svg'
import user from '../../public/logo/user.png'
import logout from '../../public/logo/logout.png'
import { CURRENT_USER } from '../graphql/authentication/query'
import { actions as userActions } from '../utils/connector/reducers/user'

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
          <img
            src={logout}
            alt="logout"
            height="30"
            style={{ marginRight: 10 }}
          />
          <Link to="/logout">
            <h5>LOGOUT</h5>
          </Link>
        </Row>
      </Link>
    </Menu.Item>
  </Menu>
)

const Bar = styled(Row)`
  background: #fff;
  color: #000;

  @media screen and (max-width: 767px) {
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`

const DesktopDropdown = styled(Row)`
  @media screen and (max-width: 767px) {
    display: none;
  }
`
class UserBar extends Component {
  render() {
    return (
      <Query query={CURRENT_USER}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'
          if (error) {
            Cookies.remove(process.env.AUTH_TOKEN_NAME)
            this.props.history.push('/login')
            return <div />
          }

          if (!data.currentUser.storeId) {
            this.props.history.push('/create')
          }

          const currentUserInStore = this.props.currentUser
          if (!currentUserInStore) {
            this.props.updateUser(data.currentUser)
          }

          return (
            <Bar type="flex" justify="space-between">
              <img
                src={Logo}
                alt="logo"
                height="30"
                style={{ margin: 'auto 0' }}
              />
              <DesktopDropdown type="flex" align="middle">
                <Avatar src={user} style={{ marginRight: 10 }} />
                <Dropdown overlay={menu}>
                  <p style={{ cursor: 'pointer' }}>
                    {data.currentUser.profile.name || 'Default name'}{' '}
                    <Icon type="down" />
                  </p>
                </Dropdown>
              </DesktopDropdown>
            </Bar>
          )
        }}
      </Query>
    )
  }
}

const UserBarWithStore = connect(
  ({ user }) => ({ currentUser: user.currentUser }),
  {
    updateUser: userActions.updateUser,
  }
)(UserBar)

export default withRouter(UserBarWithStore)
