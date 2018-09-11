import React from 'react'
import { Row, Icon } from 'antd'
import styled from 'styled-components'

const IconWrapper = styled.div`
  background-color: #446caf;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 50px;
  width: 20%;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`

const StyledButton = styled(Row)`
  height: 50px;
  background-color: #446caf;
  padding: 20px;
  width: 80%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  p {
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    letter-spacing: 0.1rem;
  }

  @media screen and (max-width: 767px) {
    p {
      font-size: 9px;
    }
  }
`

export default () => (
  <Row type="flex" style={{ borderRadius: 4, width: '100%', cursor: 'pointer' }}>
    <IconWrapper>
      <Icon type="facebook" theme="filled" style={{ fontSize: 26, color: '#fff' }} />
    </IconWrapper>
    <StyledButton type="flex" justify="center" align="middle">
      <p>SIGN IN WITH FACEBOOK</p>
    </StyledButton>
  </Row>
)
