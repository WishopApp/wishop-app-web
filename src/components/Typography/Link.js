import React from 'react'
import { Link } from 'react-static'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  p {
    cursor: pointer;
    color: #00a9ff;
  }
`

export default props => (
  <StyledLink to={props.to}>
    <p>{props.text}</p>
  </StyledLink>
)
