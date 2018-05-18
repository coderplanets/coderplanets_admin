/*
 *
 * CommunityBanner
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug, ROUTE } from '../../utils'
import * as logic from './logic'

import PostsBanner from './PostsBanner'
import ThreadsBanner from './ThreadsBanner'
import { BannerContainer } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunityBanner')
/* eslint-enable no-unused-vars */

const renderChildBanner = (route, store) => {
  const {
    /* totalCount, */
    /* curTotalCount, */
    /* tagsTotalCount, */
    postsTotalCount,
    postsCurCount,
    /* curPostsTotalCount, */
  } = store

  debug(store)
  switch (route.subQuery) {
    case ROUTE.POSTS: {
      return (
        <PostsBanner
          totalCount={postsTotalCount}
          curCount={postsCurCount - 1}
        />
      )
    }
    case ROUTE.THREADS: {
      return <ThreadsBanner totalCount={200} curCount={100} />
    }
    default: {
      return <h2>Index</h2>
    }
  }
}

class CommunityBannerContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.communityBanner)
    debug('componentWillMount  !')
  }

  render() {
    const { communityBanner } = this.props
    const { route } = communityBanner

    return (
      <BannerContainer>
        {renderChildBanner(route, communityBanner)}
      </BannerContainer>
    )
  }
}

export default inject(storePlug('communityBanner'))(
  observer(CommunityBannerContainer)
)
