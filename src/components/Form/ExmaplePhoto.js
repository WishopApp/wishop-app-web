import React from 'react'
import styled from 'styled-components'

const ExmapleImage = styled.img`
  min-width: 150px;
  min-height: 150px;
  background-image: url('${({ img }) => `${img}`}');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`

export default props => (
  <ExmapleImage
    img={props.img}
    height={props.height}
    width={props.width}
    className={props.className}
  />
)
