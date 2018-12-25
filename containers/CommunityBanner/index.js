/*
 *
 * CommunityBanner
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug, stripMobx, ROUTE } from '../../utils'
import * as logic from './logic'

import PostsBanner from './PostsBanner'
import TagsBanner from './TagsBanner'
import ThreadsBanner from './ThreadsBanner'
import SubscribersBanner from './SubscribersBanner'

import { BannerContainer } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunityBanner')
/* eslint-enable no-unused-vars */

const ChildBanner = ({
  curRoute,
  postsTotalCount,
  tagsTotalCount,
  restProps,
}) => {
  const { filteredPostsCount } = restProps

  switch (curRoute.subPath) {
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
      return <ThreadsBanner totalCount={301} filteredCount={100} />
    }
    default: {
      return <h2>Index of Community</h2>
    }
  }
}

class CommunityBannerContainer extends React.Component {
  componentDidMount() {
    const { communityBanner } = this.props
    logic.init(communityBanner)
  }

  render() {
    const { communityBanner } = this.props
    const { route, postsTotalCount, tagsTotalCount } = communityBanner

    return (
      <BannerContainer>
        <ChildBanner
          curRoute={route}
          postsTotalCount={postsTotalCount}
          tagsTotalCount={tagsTotalCount}
          restProps={stripMobx(communityBanner)}
        />
      </BannerContainer>
    )
  }
}

export default inject(storePlug('communityBanner'))(
  observer(CommunityBannerContainer)
)
