/*
 *
 * UsersTable
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

import { makeDebugger } from 'utils'
import Pagi from '../Pagi'
import { TableLoading } from '../LoadingEffects'
import MaybeCell from '../MaybeCell'
import UserCell from '../UserCell'
import TimeStampCell from '../TimeStampCell'

import PermissionCell from '../PermissionCell'
import SexCell from '../SexCell'

// import { Wrapper } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:UsersTable:index')
/* eslint-enable no-unused-vars */

class UsersTable extends React.PureComponent {
  columns() {
    const { cmsPermisstionOnChange } = this.props

    return [
      {
        title: 'id',
        dataIndex: 'id',
        align: 'center',
        fixed: 'left',
        width: 80,
      },
      {
        title: '头像',
        width: 180,
        dataIndex: '',
        align: 'center',
        fixed: 'left',
        render: record => {
          const user = { nickname: record.nickname, avatar: record.avatar }
          return <UserCell user={user} left="20px" />
        },
      },
      {
        title: '关注社区',
        dataIndex: 'subscribedCommunitiesCount',
        align: 'center',
        width: 150,
      },
      {
        title: 'bio',
        dataIndex: 'bio',
        align: 'center',
        width: 380,
        render: text => {
          return <div style={{ textAlign: 'left' }}>{text}</div>
        },
      },
      {
        title: 'sex',
        dataIndex: 'sex',
        align: 'center',
        width: 80,
        render: text => {
          return <SexCell sex={text} />
        },
      },
      {
        title: 'cms权限',
        dataIndex: 'cmsPassportString',
        align: 'center',
        width: 200,
        render: (text, record) => (
          <PermissionCell source={record} onMutate={cmsPermisstionOnChange} />
        ),
      },
      {
        title: 'email',
        dataIndex: 'email',
        align: 'center',
        width: 100,
        render: text => <MaybeCell text={text} />,
      },
      {
        title: '位置',
        dataIndex: 'location',
        align: 'center',
        width: 220,
        render: text => <MaybeCell text={text} />,
      },
      {
        title: '时间戳',
        width: 120,
        align: 'center',
        render: (text, record) => <TimeStampCell data={record} />,
      },
    ]
  }

  render() {
    const { data, loading, pageOnChange } = this.props

    return (
      <React.Fragment>
        {data ? (
          <React.Fragment>
            <Table
              columns={this.columns()}
              dataSource={data.entries}
              scroll={{ x: 2200 }}
              loading={TableLoading(loading)}
              pagination={false}
            />
            <Pagi
              left="-10px"
              pageNumber={data.pageNumber}
              pageSize={data.pageSize}
              totalCount={data.totalCount}
              onChange={pageOnChange}
            />
          </React.Fragment>
        ) : null}
      </React.Fragment>
    )
  }
}

UsersTable.propTypes = {
  data: PropTypes.any.isRequired,
  loading: PropTypes.bool,
  pageOnChange: PropTypes.func,
  cmsPermisstionOnChange: PropTypes.func,
}

UsersTable.defaultProps = {
  loading: false,
  pageOnChange: debug,
  cmsPermisstionOnChange: debug,
}

export default UsersTable
