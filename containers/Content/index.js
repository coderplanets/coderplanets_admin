/*
 *
 * Content
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

import { makeDebugger, storePlug } from '../../utils'

// import CommunitiesContent from '../CommunitiesContent'
// import CheatSheetContent from '../CheatSheetContent'
// import CommunityContent from '../../components/CommunityContent'
// import PostContent from './PostContent'

import { Table } from '../../components'

import * as logic from './logic'

import { Wrapper } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:Content')
/* eslint-enable no-unused-vars */

const columns = [
  {
    title: 'title',
    dataIndex: 'title',
    fixed: 'left',
  },
  {
    title: '作者',
    dataIndex: 'author',
  },
  {
    title: '摘要',
    dataIndex: 'digest',
  },
  {
    title: '点赞',
    dataIndex: 'star',
  },
  {
    title: '收藏',
    dataIndex: 'favorite',
  },
  {
    title: '评论',
    dataIndex: 'comments',
  },
  {
    title: '关注',
    dataIndex: 'watch',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Address2',
    dataIndex: 'address2',
  },
  {
    title: 'Address3',
    dataIndex: 'address3',
  },
]

const data = []
for (let i = 0; i < 36; i += 1) {
  data.push({
    key: i,
    title: `javascript  ${i}`,
    author: `mydearxym`,
    digest: `bla bla ${i}`,
    star: i + 30,
    favorite: i + 20,
    watch: i + 10,
    comments: 35,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    address2: `London, Park Lane no. ${i}`,
    address3: `London, Park Lane no. ${i}`,
  })
}

class ContentContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.content)
  }

  render() {
    // const { curRoute, current } = this.props.content
    //    debug('curRoute: ', curRoute)
    // <CommunityContent curRoute={curRoute} />

    return (
      <Wrapper>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1200 }}
          pagination={false}
        />
      </Wrapper>
    )
  }
}

export default inject(storePlug('content'))(observer(ContentContainer))
