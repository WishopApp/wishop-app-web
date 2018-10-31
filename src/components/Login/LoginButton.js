import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  height: 50px;
  background-color: #582fff !important;
  border-color: #582fff !important;
  transition: all 0.375ms ease-in-out;

  &:hover {
    background-color: #522bef !important;
    border-color: #522bef !important;
  }

  p {
    color: #fff !important;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.1rem;
  }

  i {
    color: #fff;
  }
`

export default props => (
  <StyledButton
    block
    onClick={props.onClick}
    htmlType="submit"
    loading={props.loading}
  >
    {!props.loading && <p>SIGN IN</p>}
  </StyledButton>
)
