/*
 *
 * ThreadsTable
 *
 */

import React from 'react'
import T from 'prop-types'
import { Table, Button } from 'antd'

import { buildLog, Trans } from '@utils'
import Pagi from '../Pagi'
import { TableLoading } from '../LoadingEffects'
import { Space } from '../BaseStyled'

import { OperationWrapper } from './styles'

/* eslint-disable no-unused-vars */
const log = buildLog('c:ThreadsTable:index')
/* eslint-enable no-unused-vars */

class ThreadsTable extends React.PureComponent {
  columns() {
    const {
      /*
         setCommunity,
         unsetCommunity,
         unsetTag,
         setTag,
       */
      onEdit,
      onDelete,
    } = this.props

    return [
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
        render: text => (
          <div>
            {Trans(text)}({text})
          </div>
        ),
      },
      {
        title: 'raw',
        width: 200,
        dataIndex: 'raw',
        align: 'center',
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
              scroll={{ x: 2000 }}
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

ThreadsTable.propTypes = {
  data: T.any.isRequired,
  loading: T.bool,
  pageOnChange: T.func,
  /*
     setCommunity: T.func,
     unsetCommunity: T.func,
     unsetTag: T.func,
     setTag: T.func,
   */
  onEdit: T.func,
  onDelete: T.func,
}

ThreadsTable.defaultProps = {
  loading: false,
  pageOnChange: log,
  /*
     setCommunity: log,
     unsetCommunity: log,
     unsetTag: log,
     setTag: log,
   */
  onEdit: log,
  onDelete: log,
}

export default ThreadsTable
