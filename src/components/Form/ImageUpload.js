import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

const StyledUpload = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  display: flex;
  background: #dfdfdf;
  justify-content: center;
  align-items: center;
  border: 1px dashed #a5a5a5;
  margin: 16px;
  cursor: pointer;
`

export default class ImageUpload extends React.Component {
  state = {
    imageSrc: 'https://strapi.io/assets/images/logo.png',
    haveExample: false,
  }

  render() {
    return (
      <StyledUpload
        style={{ backgroundImage: `url('${this.state.imageSrc}')` }}
      >
        {/* <img src={this.state.imageSrc} style={{ height: 'contain' }} /> */}
        {this.state.haveExample && (
          <div>
            <Icon type="plus" />
            Upload
          </div>
        )}
      </StyledUpload>
    )
  }
}
