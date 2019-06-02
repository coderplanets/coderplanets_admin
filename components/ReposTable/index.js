/*
 *
 * ReposTable
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'

import { makeDebugger, TYPE } from '@utils'
import Pagi from '../Pagi'
import { TableLoading } from '../LoadingEffects'
import { Space } from '../BaseStyled'
import UserCell from '../UserCell'
import CommunityCell from '../CommunityCell'
import TagsCell from '../TagsCell'
import TimeStampCell from '../TimeStampCell'

import { OperationWrapper } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:ReposTable:index')
/* eslint-enable no-unused-vars */

class ReposTable extends React.PureComponent {
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
        align: 'left',
        fixed: 'left',
        render: (text, record) => (
          <div>
            <div>{record.ownerName}</div>
            <div>{record.title}</div>
          </div>
        ),
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
              thread={TYPE.REPO}
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
            thread={TYPE.REPO}
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
        render: (text, record) => {
          return (
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
          )
        },
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

ReposTable.propTypes = {
  data: PropTypes.any.isRequired,
  loading: PropTypes.bool,
  pageOnChange: PropTypes.func,

  setCommunity: PropTypes.func,
  unsetCommunity: PropTypes.func,
  unsetTag: PropTypes.func,
  setTag: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

ReposTable.defaultProps = {
  loading: false,
  pageOnChange: debug,

  setCommunity: debug,
  unsetCommunity: debug,
  unsetTag: debug,
  setTag: debug,
  onEdit: debug,
  onDelete: debug,
}

export default ReposTable
