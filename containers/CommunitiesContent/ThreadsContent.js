import React from 'react'
/* import TimeAgo from 'timeago-react' */

import { cutFrom } from '../../utils'
import {
  Pagi,
  Table,
  TableLoading,
  /* Button, */
  /* Space, */
  /* UserCell, */
  /* CommunityCell, */
  /* TagsCell, */
} from '../../components'

/* import { OperationWrapper } from './styles' */
import * as logic from './logic'

/* eslint-disable react/display-name */
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center',
    width: 80,
  },
  {
    title: '标题',
    width: 300,
    dataIndex: 'title',
    align: 'center',
    render: text => <div>{cutFrom(text, 15)}</div>,
  },
  {
    title: 'raw',
    width: 200,
    dataIndex: 'author',
    align: 'center',
  },
  /*
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
  */
]

class ThreadsContent extends React.Component {
  componentWillMount() {
    console.log('ThreadsContent ,componentWillMount')
    logic.loadThreadsIfOnClient()
  }

  render() {
    const {
      data,
      restProps: { communitiesLoading },
    } = this.props
    return (
      <div>
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
              onChange={logic.loadJobs}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default ThreadsContent
