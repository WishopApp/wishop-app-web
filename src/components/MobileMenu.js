import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-static'
import styled from 'styled-components'

import user from '../../public/logo/user.png'
import beacon from '../../public/logo/beacon.png'
import dashboard from '../../public/logo/dashboard.png'
import staff from '../../public/logo/staff.png'
import product from '../../public/logo/product.png'

const StyledRow = styled(Row)`
  display: none;
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;
  height: 64px;
  left: 0;

  i {
    font-size: 20px;
    height: 20px;
    color: #582fff;
  }

  img {
    height: 30px;
  }

  p {
    font-size: 9px;
    margin-top: 5px;
  }

  @media screen and (max-width: 767px) {
    display: initial;
  }
`

export default class MobileMenu extends Component {
  render() {
    return (
      <StyledRow>
        <Col span={24}>
          {' '}
          <Row type="flex" justify="space-around">
            <Col span={4} style={{ padding: 8 }}>
              <Link to="/">
                <Row type="flex" justify="center" align="middle">
                  <img src={dashboard} alt="dashboard" />
                </Row>
                <Row type="flex" justify="center" align="middle">
                  <p>DASHBOARD</p>
                </Row>
              </Link>
            </Col>

            <Col span={4} style={{ padding: 8 }}>
              <Link to="/products">
                <Row type="flex" justify="center" align="middle">
                  <img src={product} alt="product" />
                </Row>
                <Row type="flex" justify="center" align="middle">
                  <p>PRODUCT</p>
                </Row>
              </Link>
            </Col>

            <Col span={4} style={{ padding: 8 }}>
              <Link to="/beacons">
                <Row type="flex" justify="center" align="middle">
                  <img src={beacon} alt="beacon" />
                </Row>
                <Row type="flex" justify="center" align="middle">
                  <p>BEACON</p>
                </Row>
              </Link>
            </Col>
            <Col span={4} style={{ padding: 8 }}>
              <Link to="/staffs">
                <Row type="flex" justify="center" align="middle">
                  <img src={staff} alt="staff" />
                </Row>
                <Row type="flex" justify="center" align="middle">
                  <p>STAFF</p>
                </Row>
              </Link>
            </Col>
            <Col span={4} style={{ padding: 8 }}>
              <Link to="/profile">
                <Row type="flex" justify="center" align="middle">
                  <img src={user} alt="user" />
                </Row>
                <Row type="flex" justify="center" align="middle">
                  <p>PROFILE</p>
                </Row>
              </Link>
            </Col>
          </Row>
        </Col>
      </StyledRow>
    )
  }
}
