import React from 'react'
import { Input } from 'antd'
import styled from 'styled-components'

const { TextArea } = Input

const StyledTextArea = styled(TextArea)`
  height: 50px;
  margin-top: 10px;
  margin-bottom: 15px;
  padding: 20px;
  border-width: 2px !important;
  border-right-width: 2px !important;
  font-family: 'Work Sans', sans-serif;

  &:hover,
  :focus {
    border-color: #582fff;
    border-right-width: 2px !important;
    box-shadow: unset;
  }
`

export default props => (
  <div>
    <h4>{props.label}</h4>
    <StyledTextArea
      type={props.type}
      value={props.value}
      rows={props.rows}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  </div>
)
