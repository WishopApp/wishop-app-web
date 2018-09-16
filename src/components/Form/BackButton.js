import React from 'react'
import { Button, Icon } from 'antd'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  height: 50px;
  background-color: #fff !important;
  border-color: #582fff !important;
  transition: all 0.375ms ease-in-out;

  &:hover {
    background-color: #522bef !important;
    border-color: #522bef !important;

    p {
      color: #fff;
    }

    i {
      color: #fff !important;
    }
  }

  p {
    color: #000;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.1rem;
  }

  i {
    color: #000;
  }
`

export default props => (
  <StyledButton block onClick={props.onClick}>
    <p>
      {' '}
      <Icon type={props.icon} style={{ color: '#000' }} /> {props.title}
    </p>
  </StyledButton>
)
