import React from 'react'
import TimeAgo from 'timeago-react'

import { cutFrom } from '../../utils'
import {
  Pagi,
  Table,
  TableLoading,
  Button,
  Space,
  ColorCell,
  CommunityCell,
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
    width: 200,
    dataIndex: 'title',
    align: 'center',
    render: text => {
      return <div>{cutFrom(text, 15)}</div>
    },
  },
  {
    title: '颜色',
    width: 80,
    dataIndex: 'color',
    align: 'center',
    render: text => {
      return <ColorCell color={text} />
    },
  },
  {
    title: '社区',
    width: 200,
    dataIndex: 'community',
    align: 'center',
    render: community => {
      return <CommunityCell data={community} />
    },
  },
  {
    title: 'thread',
    width: 200,
    dataIndex: 'thread',
    align: 'center',
    render: text => {
      return <div>{text}</div>
    },
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

class TagsContent extends React.Component {
  componentDidMount() {
    logic.loadTagsIfNeed()
  }

  render() {
    const { data, restProps: { tagsLoading } } = this.props

    return (
      <div>
        {data ? (
          <div>
            <Table
              columns={columns}
              dataSource={data.entries}
              scroll={{ x: 1500 }}
              loading={TableLoading(tagsLoading)}
              pagination={false}
            />
            <Pagi
              left="-10px"
              pageNumber={data.pageNumber}
              pageSize={data.pageSize}
              totalCount={data.totalCount}
              onChange={logic.loadTags}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default TagsContent
