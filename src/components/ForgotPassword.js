import React from 'react'
import styled from 'styled-components'

const StyledLink = styled.a`
  text-decoration: underline;
  color: #6d6d6d;
  font-size: 12px;
  margin-bottom: 40px;

  &:hover {
    text-decoration: underline;
    color: #6d6d6d;
  }
`

export default () => <StyledLink href="#">FORGOT PASSWORD?</StyledLink>
