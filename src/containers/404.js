import React from 'react'
import { Link } from 'react-static'
import { Row, Col } from 'antd'
import styled from 'styled-components'

import Logo from '../../public/logo/app-logo-no-title.svg'

const LeftCol = styled(Col)`
  text-align: center;
  min-height: 100vh;

  @media screen and (max-width: 767px) {
    background-color: #ffffff;
  }
`

const ContentCol = styled(Col)`
  margin-left: auto;

  @media screen and (max-width: 767px) {
    margin-left: unset;
  }
`

const RightCol = styled(Col)`
  @media screen and (max-width: 767px) {
    display: none;
  }
`

const MobileLogo = styled.img`
  display: none;

  @media screen and (max-width: 767px) {
    display: initial;
  }
`

export default () => (
  <Row
    type="flex"
    justify="center"
    align="middle"
    style={{ minHeight: '100vh' }}
  >
    <LeftCol xs={24} md={12}>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: '100vh' }}
      >
        <ContentCol>
          <Row>
            <MobileLogo src={Logo} height="80" alt="logo" />
            <h1 style={{ fontSize: 68 }}>404</h1>
          </Row>
          <Row>
            <h1>Page not found.</h1>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: 20 }}>
            <p>
              Let's go back <Link to="/">home</Link>
            </p>
          </Row>
        </ContentCol>
      </Row>
    </LeftCol>
    <RightCol xs={24} md={12} style={{ minHeight: '100vh' }}>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: '100vh' }}
      >
        <img
          src={Logo}
          height="200"
          alt="logo"
          style={{ marginRight: 'auto', marginLeft: 50 }}
        />
      </Row>
    </RightCol>
  </Row>
)
