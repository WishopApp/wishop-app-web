import React from 'react'
import { Button, Icon } from 'antd'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  height: 50px;
  background-color: #dcdcdc !important;
  border-color: #fff !important;
  transition: all 0.375ms ease-in-out;

  i.anticon-loading {
    color: #000;
  }

  &:hover {
    background-color: #a9a9a9 !important;
    border-color: #a9a9a9 !important;
  }

  p {
    color: #000 !important;
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
