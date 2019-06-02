import React from 'react'

import {
  Pagi,
  Table,
  TableLoading,
  Button,
  Space,
  Popconfirm,
  CategoriesCell,
  ThreadsCell,
  ContentsCountCell,
  TimeStampCell,
} from '@components'

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
    render: text => <CommunityIcon src={text} />,
  },
  {
    title: '名称',
    width: 200,
    dataIndex: 'title',
    align: 'center',
  },
  {
    title: '描述',
    width: 300,
    dataIndex: 'desc',
    align: 'left',
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
    render: (text, record) => <ContentsCountCell data={record} />,
  },
  {
    title: '时间戳',
    width: 140,
    align: 'center',
    render: (text, record) => <TimeStampCell data={record} />,
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

const IndexContent = ({ data, restProps: { communitiesLoading } }) => (
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

export default IndexContent
