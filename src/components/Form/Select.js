import React from 'react'
import { AutoComplete, Select } from 'antd'
import styled from 'styled-components'

const Option = Select.Option

const StyledSelect = styled(AutoComplete)`
  &.ant-select-auto-complete.ant-select .ant-select-selection__rendered {
    line-height: 50px;
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

  &.ant-select-dropdown-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
  }
`

export default props => (
  <div>
    <h4>{props.label}</h4>
    <StyledSelect
      value={props.value}
      placeholder={props.placeholder}
      onSearch={props.onSearch}
      onChange={props.onChange}
    >
      {props.data.map(d => (
        <Option key={d.value}>{d.text}</Option>
      ))}
    </StyledSelect>
  </div>
)
