/*
 *
 * UsersTable
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

import { makeDebugger } from '@utils'

import Pagi from '@components/Pagi'
import { TableLoading } from '@components/LoadingEffects'
import MaybeCell from '@components/MaybeCell'
import UserCell from '@components/UserCell'
import SocialSell from '@components/SocialSell'
import TimeStampCell from '@components/TimeStampCell'

import PermissionCell from '@components/PermissionCell'
import SexCell from '@components/SexCell'

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
        title: '城市',
        dataIndex: 'location',
        align: 'left',
        width: 120,
        render: text => <MaybeCell text={text} align="left" />,
      },
      {
        title: 'email',
        dataIndex: 'email',
        align: 'left',
        width: 150,
        render: text => <MaybeCell text={text} align="left" />,
      },
      {
        title: '社交账号',
        dataIndex: 'social',
        align: 'center',
        width: 150,
        render: data => <SocialSell data={data} />,
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
        title: '时间戳',
        width: 120,
        align: 'center',
        render: (text, record) => <TimeStampCell data={record} />,
      },
    ]
  }

  render() {
    const { data, loading, pageOnChange } = this.props

    console.log('UsersTable data: ', data)

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
