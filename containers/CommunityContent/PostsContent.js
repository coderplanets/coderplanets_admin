import React from 'react'
import TimeAgo from 'timeago-react'

import { cutFrom } from '../../utils'
import {
  Pagi,
  Table,
  TableLoading,
  Button,
  Space,
  UserCell,
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
    title: '作者',
    width: 200,
    dataIndex: 'author',
    align: 'center',
    render: author => {
      return <UserCell user={author} />
    },
  },
  {
    title: '标题',
    width: 200,
    dataIndex: 'title',
    align: 'center',
    render: text => {
      return <div>{cutFrom(text, 15)}</div>
    },
  },
  {
    title: '摘要',
    width: 300,
    dataIndex: 'digest',
    align: 'center',
    render: text => {
      return <div>{cutFrom(text, 10)}</div>
    },
  },
  {
    title: '浏览',
    width: 100,
    dataIndex: 'views',
    align: 'center',
  },
  {
    title: '收藏',
    width: 100,
    dataIndex: 'favoritedCount',
    align: 'center',
  },
  {
    title: '点赞',
    width: 100,
    dataIndex: 'starredCount',
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

class PostsContent extends React.Component {
  componentDidMount() {
    // logic.loadPosts()
  }

  render() {
    const {
      data,
      restProps: { postsLoading },
    } = this.props
    return (
      <div>
        {data ? (
          <div>
            <Table
              columns={columns}
              dataSource={data.entries}
              scroll={{ x: 1500 }}
              loading={TableLoading(postsLoading)}
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
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default PostsContent
