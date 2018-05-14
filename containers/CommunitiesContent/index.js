/*
 *
 * CommunitiesContent
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
import TimeAgo from 'timeago-react'

// import Link from 'next/link'

import { Pagi, Table, TableLoading } from '../../components'

import { makeDebugger, storePlug, cutFrom } from '../../utils'

import { Wrapper, CommunityIcon } from './styles'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunitiesContent')
/* eslint-enable no-unused-vars */

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
    render: text => {
      // TODO: jadge image type before render, currently only svg supported
      return <CommunityIcon path={text} />
    },
  },
  {
    title: '名称',
    width: 200,
    dataIndex: 'title',
    align: 'center',
    render: text => {
      return <div>{cutFrom(text, 15)}</div>
    },
  },
  {
    title: '描述',
    width: 200,
    dataIndex: 'desc',
    align: 'center',
    render: text => {
      return <div>{cutFrom(text, 10)}</div>
    },
  },
  {
    title: 'raw',
    width: 150,
    dataIndex: 'raw',
    align: 'center',
    render: text => {
      return <div>{cutFrom(text, 10)}</div>
    },
  },
  {
    title: '订阅人数',
    width: 100,
    align: 'center',
    dataIndex: 'subscribersCount',
  },
  {
    title: '编辑人数',
    width: 100,
    dataIndex: 'editorsCount',
    align: 'center',
  },
  {
    title: '帖子数',
    width: 100,
    dataIndex: 'postsCount',
    align: 'center',
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
]

class CommunitiesContentContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.communitiesContent)
  }

  render() {
    const { communitiesContent } = this.props
    const { pagedCommunitiesData, communitiesLoading } = communitiesContent
    return (
      <Wrapper>
        {pagedCommunitiesData ? (
          <div>
            <Table
              columns={columns}
              dataSource={pagedCommunitiesData.entries}
              scroll={{ x: 1200 }}
              loading={TableLoading(communitiesLoading)}
              pagination={false}
            />
            <Pagi
              left="-10px"
              pageNumber={pagedCommunitiesData.pageNumber}
              pageSize={pagedCommunitiesData.pageSize}
              totalCount={pagedCommunitiesData.totalCount}
              onChange={logic.pageChange}
            />
          </div>
        ) : (
          <div />
        )}
      </Wrapper>
    )
  }
}

export default inject(storePlug('communitiesContent'))(
  observer(CommunitiesContentContainer)
)
