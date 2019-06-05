/*
 *
 * JobsTable
 *
 */

import React from 'react'
import T from 'prop-types'
import { Table, Button } from 'antd'

import { makeDebugger, cutFrom } from '@utils'
import Pagi from '../Pagi'
import { TableLoading } from '../LoadingEffects'
import { Space } from '../BaseStyled'
import UserCell from '../UserCell'
import CommunityCell from '../CommunityCell'
import TagsCell from '../TagsCell'
import TimeStampCell from '../TimeStampCell'

import { OperationWrapper } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:JobsTable:index')
/* eslint-enable no-unused-vars */

class JobsTable extends React.PureComponent {
  columns() {
    const {
      setCommunity,
      unsetCommunity,
      unsetTag,
      setTag,
      onEdit,
      onDelete,
    } = this.props

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
        width: 300,
        dataIndex: 'title',
        align: 'center',
        fixed: 'left',
        render: text => {
          return <div>{cutFrom(text, 50)}</div>
        },
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
              thread="JOB"
              onDelete={unsetCommunity}
              onAdd={setCommunity}
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
            thread="JOB"
            source={record}
            onDelete={unsetTag}
            onAdd={setTag}
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
      /*
         {
         title: '收藏',
         width: 100,
         dataIndex: 'favoritedCount',
         align: 'center',
         },
       */
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

JobsTable.propTypes = {
  data: T.any.isRequired,
  loading: T.bool,
  pageOnChange: T.func,
  setCommunity: T.func,
  unsetCommunity: T.func,
  unsetTag: T.func,
  setTag: T.func,
  onEdit: T.func,
  onDelete: T.func,
}

JobsTable.defaultProps = {
  loading: false,
  pageOnChange: debug,
  setCommunity: debug,
  unsetCommunity: debug,
  unsetTag: debug,
  setTag: debug,
  onEdit: debug,
  onDelete: debug,
}

export default JobsTable
