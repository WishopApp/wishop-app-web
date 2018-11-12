import React, { Component } from 'react'
import { Row, Col, Card, Modal, Table, notification } from 'antd'
import { connect } from 'react-redux'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import moment from 'moment'

import Button from '../Form/Button'
import Input from '../Form/Input'
import { STORE_BRANCHES } from '../../graphql/query/store-branch'
import { CREATE_BRANCH } from '../../graphql/mutation/store-branch'

const createNewBranch = ({ render }) => (
  <Mutation mutation={CREATE_BRANCH}>
    {(mutation, result) => render({ mutation, result })}
  </Mutation>
)

const Composed = adopt({
  createNewBranch,
})

class BranchTable extends Component {
  state = {
    visible: false,
    name: '',
    telNo: '',
    staffUsername: '',
    staffPassword: '',
  }

  render() {
    const columns = [
      {
        title: 'Branch Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Tel no.',
        dataIndex: 'telNo',
        key: 'telNo',
      },
      {
        title: 'Staff Username',
        dataIndex: 'staffUsername',
        key: 'staffUsername',
      },
      {
        title: 'Registered At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: createdAt => (
          <div>
            {moment(createdAt).format('DD-MM-YYYY')}
            <br />
            {moment(createdAt).format('HH:mm')}
          </div>
        ),
      },
      {
        title: '',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record, index) => (
          <div>
            {index !== 0 && <a onClick={() => console.log('delete')}>DELETE</a>}
          </div>
        ),
      },
    ]

    if (!this.props.currentUser) {
      return <Card loading />
    }

    return (
      <Composed>
        {({ createNewBranch }) => {
          const onCreateBranch = branchRefetch => {
            try {
              const { name, staffUsername, staffPassword, telNo } = this.state

              createNewBranch.mutation({
                variables: {
                  storeId: this.props.currentUser.storeId,
                  name,
                  staffUsername,
                  staffPassword,
                  telNo,
                },
              })

              this.setState({
                visible: false,
              })

              branchRefetch()

              notification.success({
                message: 'Great!',
                description: 'New branch has been created.',
              })
            } catch (error) {
              console.error(error.message)
            }
          }

          return (
            <Query
              query={STORE_BRANCHES}
              variables={{ storeId: this.props.currentUser.storeId }}
            >
              {({ loading, error, data, refetch }) => {
                if (loading) return <Card loading />
                if (error) return `Error: ${error.message}`

                return (
                  <Row gutter={16}>
                    <Col xs={24} md={6} className="m-b-16">
                      <Card>
                        <Row type="flex" justify="center" align="middle">
                          <Button
                            title="CREATE NEW BRANCH"
                            icon="plus"
                            onClick={() => this.setState({ visible: true })}
                          />
                        </Row>
                      </Card>
                    </Col>
                    <Col xs={24} md={18}>
                      <Card>
                        <Row gutter={16}>
                          <Col span={24} className="m-t-16">
                            <Table
                              columns={columns}
                              dataSource={data.storeBranches}
                            />
                          </Col>
                        </Row>
                      </Card>
                    </Col>

                    <Modal
                      title="CREATE NEW BRANCH"
                      visible={this.state.visible}
                      onOk={() => onCreateBranch(refetch)}
                      onCancel={() => this.setState({ visible: false })}
                      okText="CREATE"
                      cancelText="CLOSE"
                    >
                      <Input
                        label="Branch name"
                        placeholder="Enter branch name"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                      />
                      <Input
                        label="Phone number"
                        placeholder="Enter phone number"
                        value={this.state.telNo}
                        onChange={e => this.setState({ telNo: e.target.value })}
                      />
                      <Input
                        label="Account username"
                        placeholder="Enter username"
                        value={this.state.staffUsername}
                        onChange={e =>
                          this.setState({ staffUsername: e.target.value })
                        }
                      />
                      <Input
                        label="Account password"
                        placeholder="Enter password"
                        type="password"
                        value={this.state.staffPassword}
                        onChange={e =>
                          this.setState({ staffPassword: e.target.value })
                        }
                      />
                    </Modal>
                  </Row>
                )
              }}
            </Query>
          )
        }}
      </Composed>
    )
  }
}

const BranchTableWithStore = connect(
  ({ user }) => ({
    currentUser: user.currentUser,
  }),
  null
)(BranchTable)

export default BranchTableWithStore
