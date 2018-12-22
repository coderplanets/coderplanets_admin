import React from 'react'
import ReactTooltip from 'react-tooltip'

import {
  Pagi,
  Table,
  TableLoading,
  Button,
  Space,
  UserCell,
  CommunityCell,
  TimeStampCell,
} from '../../components'

import { OperationWrapper } from './styles'
import { Trans } from '../../utils'
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
    render: text => <div>{Trans(text)}</div>,
  },
  {
    title: 'raw',
    width: 150,
    dataIndex: 'raw',
    align: 'center',
  },
  {
    title: '社区',
    width: 260,
    dataIndex: 'communities',
    align: 'center',
    render: communities => <CommunityCell array={communities} />,
  },
  {
    title: '创建者',
    width: 180,
    dataIndex: 'author',
    align: 'center',
    render: text => <UserCell user={text} />,
  },
  {
    title: '时间戳',
    width: 120,
    align: 'center',
    render: (text, record) => <TimeStampCell data={record} />,
  },
  {
    title: '操作',
    width: 200,
    dataIndex: '',
    align: 'center',
    render: (text, record) => (
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
    ),
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
