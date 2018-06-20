import React from 'react'
import TimeAgo from 'timeago-react'

/* import { Pagination } from 'antd' */

import { cutFrom } from '../../utils'
import {
  Pagi,
  Table,
  TableLoading,
  Button,
  Space,
  Popconfirm,
  CategoriesCell,
  ThreadsCell,
} from '../../components'

import { CommunityIcon, OperationWrapper } from './styles'
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
    title: 'logo',
    dataIndex: 'logo',
    align: 'center',
    fixed: 'left',
    width: 80,
    render: text => {
      // TODO: jadge image type before render, currently only svg supported
      return <CommunityIcon src={text} />
    },
  },
  {
    title: '名称',
    width: 200,
    dataIndex: 'title',
    align: 'center',
    render: text => {
      return <div>{cutFrom(text, 15)}</div>
    },
  },
  {
    title: '描述',
    width: 300,
    dataIndex: 'desc',
    align: 'center',
    render: text => {
      return <div>{cutFrom(text, 10)}</div>
    },
  },
  {
    title: 'threads',
    width: 350,
    dataIndex: 'threads',
    align: 'center',
    render: (threads, record) => (
      <ThreadsCell
        source={record}
        data={threads}
        onDelete={logic.unsetThread}
        onAdd={logic.setThread}
      />
    ),
  },
  {
    title: 'raw',
    width: 150,
    dataIndex: 'raw',
    align: 'center',
    render: text => {
      return <div>{cutFrom(text, 10)}</div>
    },
  },
  {
    title: '类别',
    width: 350,
    align: 'center',
    dataIndex: 'categories',
    render: (categoriesArray, record) => (
      <CategoriesCell
        source={record}
        categories={categoriesArray}
        communityId={record.id}
        onDelete={logic.unsetCategory}
        onAdd={logic.setCategory}
      />
    ),
  },
  {
    title: '订阅人数',
    width: 150,
    align: 'center',
    dataIndex: 'subscribersCount',
  },
  {
    title: '编辑人数',
    width: 150,
    dataIndex: 'editorsCount',
    align: 'center',
  },
  {
    title: '帖子数',
    width: 100,
    dataIndex: 'postsCount',
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
    key: 'operation',
    render: (text, record) => (
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
        <Popconfirm
          title="确定删除 ?？"
          okText="Y"
          cancelText="N"
          onConfirm={logic.onDelete.bind(this, record)}
        >
          <Button size="small" type="red" ghost>
            删除
          </Button>
        </Popconfirm>
      </OperationWrapper>
    ),
  },
]

class IndexContent extends React.Component {
  componentWillMount() {
    logic.loadCommunitiesIfOnClient()
  }

  render() {
    const {
      data,
      restProps: { communitiesLoading },
    } = this.props

    return (
      <React.Fragment>
        {data ? (
          <React.Fragment>
            <Table
              columns={columns}
              dataSource={data.entries}
              scroll={{ x: 1800 }}
              loading={TableLoading(communitiesLoading)}
              pagination={false}
            />
            <Pagi
              left="-10px"
              pageNumber={data.pageNumber}
              pageSize={data.pageSize}
              totalCount={data.totalCount}
              onChange={logic.loadCommunities}
            />
          </React.Fragment>
        ) : null}
      </React.Fragment>
    )
  }
}

export default IndexContent
