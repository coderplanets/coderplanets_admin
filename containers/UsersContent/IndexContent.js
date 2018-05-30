import React from 'react'
import TimeAgo from 'timeago-react'

// import { cutFrom } from '../../utils'
import {
  Pagi,
  Table,
  TableLoading,
  Button,
  Space,
  MaybeCell,
  UserCell,
  SexCell,
  PermissionCell,
} from '../../components'

import { OperationWrapper } from './styles'
import * as logic from './logic'

/* eslint-disable react/display-name */
const columns = [
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
    title: 'education',
    dataIndex: 'education',
    align: 'center',
    width: 150,
    render: text => <MaybeCell text={text} />,
  },
  {
    title: 'cms权限',
    dataIndex: 'cmsPassportString',
    align: 'center',
    width: 200,
    render: (text, record) => (
      <PermissionCell source={record} onClick={logic.onCmsPermissionEdit} />
    ),
  },
  {
    title: 'company',
    dataIndex: 'company',
    align: 'center',
    width: 150,
    render: text => <MaybeCell text={text} />,
  },

  {
    title: 'email',
    dataIndex: 'email',
    align: 'center',
    width: 100,
    render: text => <MaybeCell text={text} />,
  },
  {
    title: 'qq',
    dataIndex: 'qq',
    align: 'center',
    width: 100,
    render: text => <MaybeCell text={text} />,
  },
  {
    title: 'weixin',
    dataIndex: 'weixin',
    align: 'center',
    width: 150,
    render: text => <MaybeCell text={text} />,
  },
  {
    title: 'weibo',
    dataIndex: 'weibo',
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
    title: '注册时间',
    width: 150,
    dataIndex: 'insertedAt',
    align: 'center',
    render: text => {
      return <TimeAgo datetime={text} locale="zh_CN" />
    },
  },
  {
    title: '操作',
    width: 250,
    dataIndex: '',
    align: 'center',
    render: (text, record) => {
      return (
        <OperationWrapper>
          <Button
            size="small"
            type="primary"
            ghost
            onClick={logic.onEdit.bind(this, record)}
          >
            编辑
          </Button>
          <Space right="10px" />
          <Button
            size="small"
            type="red"
            ghost
            onClick={logic.onDelete.bind(this, record)}
          >
            删除
          </Button>
        </OperationWrapper>
      )
    },
  },
]

class IndexContent extends React.Component {
  componentWillMount() {
    logic.loadUsers()
  }

  render() {
    const {
      data,
      restProps: { usersLoading },
    } = this.props

    return (
      <div>
        {data ? (
          <div>
            <Table
              columns={columns}
              dataSource={data.entries}
              scroll={{ x: 2200 }}
              loading={TableLoading(usersLoading)}
              pagination={false}
            />
            <Pagi
              left="-10px"
              pageNumber={data.pageNumber}
              pageSize={data.pageSize}
              totalCount={data.totalCount}
              onChange={logic.loadUsers}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default IndexContent
