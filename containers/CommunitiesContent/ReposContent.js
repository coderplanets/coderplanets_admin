import React from 'react'
import TimeAgo from 'timeago-react'

import {
  Pagi,
  Table,
  TableLoading,
  Button,
  Space,
  UserCell,
  CommunityCell,
  TagsCell,
} from '../../components'

import { OperationWrapper } from './styles'
import * as logic from './logic'

/* eslint-disable react/display-name */
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center',
    width: 80,
    fixed: 'left',
  },
  {
    title: '标题',
    width: 300,
    align: 'left',
    fixed: 'left',
    render: (text, record) => (
      <div>
        <div>{record.ownerName}</div>
        <div>{record.title}</div>
      </div>
    ),
  },
  {
    title: '作者',
    width: 200,
    dataIndex: 'author',
    align: 'center',
    render: author => {
      return <UserCell user={author} />
    },
  },
  {
    title: '社区',
    width: 150,
    dataIndex: 'communities',
    align: 'center',
    render: (communities, record) => {
      return (
        <CommunityCell
          array={communities}
          source={record}
          thread="POST"
          onDelete={logic.unsetCommunity}
          onAdd={logic.setCommunity}
          withSetter
        />
      )
    },
  },
  {
    title: '标签',
    width: 250,
    dataIndex: 'tags',
    align: 'center',
    render: (tags, record) => (
      <TagsCell
        thread="POST"
        source={record}
        onDelete={logic.unsetTag}
        onAdd={logic.setTag}
      />
    ),
  },
  {
    title: '浏览',
    width: 100,
    dataIndex: 'views',
    align: 'center',
  },
  {
    title: '评论数',
    width: 100,
    dataIndex: 'commentsCount',
    align: 'center',
  },
  {
    title: '评论参与',
    width: 150,
    dataIndex: 'commentsParticipatorsCount',
    align: 'center',
  },
  {
    title: '创建时间',
    width: 150,
    dataIndex: 'insertedAt',
    align: 'center',
    render: text => {
      return <TimeAgo datetime={text} locale="zh_CN" />
    },
  },
  {
    title: '上次更新',
    width: 150,
    dataIndex: 'updatedAt',
    align: 'center',
    render: text => {
      return <TimeAgo datetime={text} locale="zh_CN" />
    },
  },
  {
    title: '操作',
    width: 200,
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

const ReposContent = ({ data, restProps: { communitiesLoading } }) => (
  <React.Fragment>
    {data ? (
      <div>
        <Table
          columns={columns}
          dataSource={data.entries}
          scroll={{ x: 2000 }}
          loading={TableLoading(communitiesLoading)}
          pagination={false}
        />
        <Pagi
          left="-10px"
          pageNumber={data.pageNumber}
          pageSize={data.pageSize}
          totalCount={data.totalCount}
          onChange={logic.loadPosts}
        />
      </div>
    ) : null}
  </React.Fragment>
)

export default ReposContent
