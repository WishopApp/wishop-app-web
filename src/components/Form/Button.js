import React from 'react'
import { Button, Icon } from 'antd'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  height: 50px;
  background-color: #582fff !important;
  border-color: #582fff !important;
  transition: all 0.375ms ease-in-out;

  i.anticon-loading {
    color: #fff;
  }

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
`

export default props => (
  <StyledButton
    block
    onClick={props.onClick}
    htmlType="submit"
    loading={props.loading}
  >
    {!props.loading && (
      <p>
        {' '}
        <Icon type={props.icon} style={{ color: '#fff' }} /> {props.title}
      </p>
    )}
  </StyledButton>
)
