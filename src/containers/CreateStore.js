import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Mutation, Query } from 'react-apollo'
import Cookies from 'js-cookie'
import { withRouter } from 'react-static'

import Button from '../components/Form/Button'
import Input from '../components/Form/Input'
import TextArea from '../components/Form/TextArea'
import ImageUpload from '../components/Form/ImageUpload'
import axios from '../utils/axios-creator'
import { CREATE_STORE } from '../graphql/mutation/store'
import { CURRENT_USER } from '../graphql/authentication/query'

class Register extends Component {
  state = {
    name: '',
    description: '',
    avatar: '',
    loading: false,
  }

  componentWillMount() {
    const token = Cookies.get(process.env.AUTH_TOKEN_NAME)
    if (!token) {
      this.props.history.push('/login')
    }
  }

  createNewStore = async (createStoreMutation, ownerId) => {
    this.setState({
      loading: true,
    })

    const formData = new FormData()
    formData.append('photo', this.state.avatar)

    const headers = {
      'content-type': 'multipart/form-data',
    }

    const resp = await axios.post('/upload', formData, headers)

    if (resp.data.code === 200) {
      try {
        const avatarUrl = resp.data.result.fileLocation
        await createStoreMutation({
          variables: {
            ownerId,
            name: this.state.name,
            description: this.state.description,
            avatarUrl,
          },
        })

        window.location.href = '/'
      } catch (err) {
        console.error(err)
      }
    }
  }

  render() {
    return (
      <Mutation mutation={CREATE_STORE}>
        {createStoreMutation => (
          <Row
            type="flex"
            justify="center"
            align="middle"
            style={{ minHeight: '100vh' }}
          >
            <Query query={CURRENT_USER}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...'
                if (error) {
                  Cookies.remove(process.env.AUTH_TOKEN_NAME)
                  this.props.history.push('/login')
                  return <div />
                }

                return (
                  <Col xs={20} md={20} lg={14}>
                    <Row className="m-b-16" type="flex" justify="center">
                      <h1 style={{ fontSize: 38 }}>My first store</h1>
                    </Row>
                    <Row type="flex" justify="center">
                      <Col xs={24} md={12}>
                        <h4>Store Avatar</h4>
                        <Row type="flex" justify="center">
                          <ImageUpload
                            name="avatar"
                            onChange={(key, value) =>
                              this.setState({ [key]: value })
                            }
                          />
                        </Row>
                      </Col>
                    </Row>
                    <Row type="flex" justify="center">
                      <Col xs={24} md={12}>
                        <Input
                          label="Store Name"
                          type="text"
                          value={this.state.name}
                          onChange={e =>
                            this.setState({ name: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                    <Row type="flex" justify="center">
                      <Col xs={24} md={12}>
                        <TextArea
                          label="Store Description"
                          type="text"
                          rows={8}
                          value={this.state.description}
                          onChange={e =>
                            this.setState({ description: e.target.value })
                          }
                        />
                      </Col>
                    </Row>
                    <Row type="flex" justify="center">
                      <Col xs={24} md={12}>
                        <Button
                          title="CREATE"
                          onClick={() =>
                            this.createNewStore(
                              createStoreMutation,
                              data.currentUser._id
                            )
                          }
                          loading={this.state.loading}
                        />
                      </Col>
                    </Row>
                  </Col>
                )
              }}
            </Query>
          </Row>
        )}
      </Mutation>
    )
  }
}

export default withRouter(Register)
