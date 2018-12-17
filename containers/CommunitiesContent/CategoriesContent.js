import React from 'react'
import TimeAgo from 'timeago-react'
import ReactTooltip from 'react-tooltip'

import { cutFrom } from '../../utils'
import {
  Pagi,
  Table,
  TableLoading,
  Button,
  Space,
  UserCell,
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
  },
  {
    title: '标题',
    width: 150,
    dataIndex: 'title',
    align: 'center',
    render: text => {
      return <div>{cutFrom(text, 15)}</div>
    },
  },
  {
    title: 'raw',
    width: 150,
    dataIndex: 'raw',
    align: 'center',
    render: text => {
      return <div>{cutFrom(text, 15)}</div>
    },
  },
  {
    title: '社区',
    width: 260,
    dataIndex: 'communities',
    align: 'center',
    render: communities => {
      return <CommunityCell array={communities} />
    },
  },
  {
    title: '创建者',
    width: 160,
    dataIndex: 'author',
    align: 'center',
    render: author => {
      return <UserCell user={author} />
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
            onClick={logic.onEditCategory.bind(this, record)}
          >
            编辑
          </Button>
          <Space right="10px" />
          <Button
            size="small"
            type="red"
            ghost
            onClick={logic.onDeleteCagegory.bind(this, record)}
          >
            删除
          </Button>
        </OperationWrapper>
      )
    },
  },
]

class CategoriesContent extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 2000)
  }

  render() {
    const {
      data,
      restProps: { categoriesLoading },
    } = this.props

    return (
      <div>
        {data ? (
          <div>
            <Table
              columns={columns}
              dataSource={data.entries}
              scroll={{ x: 1500 }}
              loading={TableLoading(categoriesLoading)}
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

export default CategoriesContent
