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
import TagsBanner from './TagsBanner'
import ThreadsBanner from './ThreadsBanner'
import SubscribersBanner from './SubscribersBanner'

import { BannerContainer } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunityBanner')
/* eslint-enable no-unused-vars */

const renderChildBanner = (route, store) => {
  const {
    /* totalCount, */
    /* curTotalCount, */
    tagsTotalCount,
    postsTotalCount,
    filteredPostsCount,
    /* curPostsTotalCount, */
  } = store

  debug(store)
  switch (route.subQuery) {
    case ROUTE.POSTS: {
      return (
        <PostsBanner
          totalCount={postsTotalCount}
          filteredCount={filteredPostsCount}
        />
      )
    }
    case ROUTE.SUBSCRIBERS: {
      return <SubscribersBanner totalCount={100} filteredCount={10} />
    }
    case ROUTE.TAGS: {
      return (
        <TagsBanner
          totalCount={tagsTotalCount}
          filteredCount={tagsTotalCount}
        />
      )
    }
    case ROUTE.THREADS: {
      return <ThreadsBanner totalCount={200} filteredCount={100} />
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
