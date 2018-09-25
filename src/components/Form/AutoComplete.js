import React from 'react'
import { AutoComplete } from 'antd'
import styled from 'styled-components'

const StyledAutoComplete = styled(AutoComplete)`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 15px;

  &.ant-select-auto-complete.ant-select .ant-select-selection--single {
    height: 50px;
  }

  &.ant-select-auto-complete.ant-select .ant-input {
    height: 50px;
    border-width: 2px !important;
    border-right-width: 2px !important;
    font-family: 'Work Sans', sans-serif;

    :hover,
    :focus {
      border-color: #582fff;
      border-right-width: 2px !important;
      box-shadow: unset;
    }
  }
`

export default props => (
  <div>
    <h4>{props.label}</h4>
    <StyledAutoComplete dataSource={props.dataSource} placeholder={props.placeholder} />
  </div>
)
