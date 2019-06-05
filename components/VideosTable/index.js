/*
 *
 * VideosTable
 *
 */

import React from 'react'
import T from 'prop-types'
import { Table, Button } from 'antd'

import { buildLog, cutFrom, TYPE } from '@utils'
import { OperationWrapper } from './styles'

import Pagi from '../Pagi'
import { TableLoading } from '../LoadingEffects'
import { Space } from '../BaseStyled'
import UserCell from '../UserCell'
import CommunityCell from '../CommunityCell'
import TagsCell from '../TagsCell'
import TimeStampCell from '../TimeStampCell'

/* eslint-disable no-unused-vars */
const log = buildLog('c:VideosTable:index')
/* eslint-enable no-unused-vars */

class VideosTable extends React.Component {
  /*
     constructor(props) {
     super(props)
     }
   */

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
        render: text => <div>{cutFrom(text, 15)}</div>,
      },
      {
        title: '作者',
        width: 200,
        dataIndex: 'author',
        align: 'center',
        render: author => <UserCell user={author} />,
      },
      {
        title: '社区',
        width: 150,
        dataIndex: 'communities',
        align: 'center',
        render: (communities, record) => (
          <CommunityCell
            array={communities}
            source={record}
            thread={TYPE.VIDEO}
            onDelete={unsetCommunity}
            onAdd={setCommunity}
            withSetter
          />
        ),
      },
      {
        title: '标签',
        width: 250,
        dataIndex: 'tags',
        align: 'center',
        render: (tags, record) => (
          <TagsCell
            thread={TYPE.VIDEO}
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
        title: '评论',
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
         {
         title: '点赞',
         width: 100,
         dataIndex: 'starredCount',
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

VideosTable.propTypes = {
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

VideosTable.defaultProps = {
  loading: false,
  pageOnChange: log,
  setCommunity: log,
  unsetCommunity: log,
  unsetTag: log,
  setTag: log,
  onEdit: log,
  onDelete: log,
}

export default React.memo(VideosTable)
