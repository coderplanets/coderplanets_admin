/*
 *
 * TagsTable
 *
 */

import React from 'react'
import T from 'prop-types'
import { Table, Button } from 'antd'

import { buildLog, Trans } from '@utils'
import Pagi from '../Pagi'
import { TableLoading } from '../LoadingEffects'
import { Space } from '../BaseStyled'
import ColorCell from '../ColorCell'
import CommunityCell from '../CommunityCell'
import TimeStampCell from '../TimeStampCell'

import { OperationWrapper } from './styles'

/* eslint-disable no-unused-vars */
const debug = buildLog('c:TagsTable:index')
/* eslint-enable no-unused-vars */

class TagsTable extends React.PureComponent {
  columns() {
    const { onEdit, onDelete } = this.props

    return [
      {
        title: 'id',
        dataIndex: 'id',
        align: 'center',
        width: 80,
        fixed: 'left',
      },
      {
        title: '标题',
        width: 120,
        dataIndex: 'title',
        align: 'left',
        render: text => (
          <div>
            {Trans(text)}({text})
          </div>
        ),
      },
      {
        title: '颜色',
        width: 60,
        dataIndex: 'color',
        align: 'center',
        render: text => <ColorCell color={text} />,
      },
      {
        title: '社区',
        width: 200,
        dataIndex: 'community',
        align: 'center',
        render: community => <CommunityCell data={community} />,
      },
      {
        title: '版块',
        width: 200,
        dataIndex: 'thread',
        align: 'center',
        render: text => (
          <div>
            {Trans(text)}({text})
          </div>
        ),
      },
      {
        title: '子话题',
        width: 150,
        dataIndex: 'topic',
        align: 'center',
        render: text => (
          <div>
            {Trans(text.title)}({text.title})
          </div>
        ),
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
              onClick={onEdit.bind(this, record)}
            >
              编辑
            </Button>
            <Space right="10px" />
            <Button
              size="small"
              type="red"
              ghost
              onClick={onDelete.bind(this, record)}
            >
              删除
            </Button>
          </OperationWrapper>
        ),
      },
    ]
  }

  render() {
    const { data, loading, pageOnChange } = this.props

    return (
      <React.Fragment>
        {data ? (
          <div>
            <Table
              columns={this.columns()}
              dataSource={data.entries}
              scroll={{ x: 1500 }}
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
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}

TagsTable.propTypes = {
  data: T.any.isRequired,
  loading: T.bool,
  pageOnChange: T.func,

  onEdit: T.func,
  onDelete: T.func,
}

TagsTable.defaultProps = {
  loading: false,
  pageOnChange: debug,
  onEdit: debug,
  onDelete: debug,
}

export default TagsTable
