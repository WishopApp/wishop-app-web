import React, { Component } from 'react'
import { Row } from 'antd'
import styled from 'styled-components'

import Logo from '../../public/logo/app-logo-inline-text.svg'

const Bar = styled(Row)`
  background: #fff;
  color: #000;

  @media screen and (max-width: 767px) {
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`

export default class UserBar extends Component {
  render() {
    return (
      <Bar type="flex" justify="space-between">
        <img src={Logo} alt="logo" height="30" style={{ margin: 'auto 0' }} />
      </Bar>
    )
  }
}
