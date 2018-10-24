import React from 'react'
import styled from 'styled-components'
import { Icon, Input } from 'antd'

import blank from '../../../public/logo/blank.svg'

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
  padding: 5px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  .pre-upload {
    position: absolute;
    z-index: 99;
    font-weight: bold;
  }

  .re-upload {
    background-color: rgba(0, 0, 0, 0.8);
    height: 100%;
    width: 100%;
    border-radius: 50%;
    display: none;
    color: #fff;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    z-index: 999;
    position: absolute;
  }

  &:hover .re-upload {
    display: flex;
  }
`

const UsedImage = styled.img`
  height: 150px;
  width: 150px;
  min-width: 150px;
  border-radius: 50%;
  background-image: url('${({ img }) => `${img}`}');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`

export default class ImageUpload extends React.Component {
  state = {
    haveExample: false,
  }

  handleClick = () => {
    const uploadElement = document.getElementById(this.props.name)
    uploadElement.click()
  }

  showExample = (field, e) => {
    const reader = new FileReader()
    const preview = document.getElementById(`${field}example`)

    reader.onloadend = () => {
      preview.src = reader.result
    }

    reader.readAsDataURL(e.target.files[0])
  }

  setImage = (field, e) => {
    this.showExample(field, e)
    this.props.onChange(field, e.target.files[0])
    this.setState({ haveExample: true })
  }

  render() {
    return (
      <div>
        <Input
          accept="image/*"
          type="file"
          id={this.props.name}
          onChange={e => this.setImage(this.props.name, e)}
          style={{ display: 'none' }}
        />

        <StyledUpload onClick={this.handleClick}>
          <div className="re-upload">
            <Icon type="upload" theme="outlined" />
          </div>

          <UsedImage
            id={`${this.props.name}example`}
            img={this.props.img}
            src={blank}
          />

          {!this.state.haveExample && (
            <div className="pre-upload">
              <Icon type="plus" className="m-r-16" />
              Upload
            </div>
          )}
        </StyledUpload>
      </div>
    )
  }
}
