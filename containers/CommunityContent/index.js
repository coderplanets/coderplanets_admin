/*
 *
 * CommunityContent
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug, ROUTE } from '../../utils'

import PostsContent from './PostsContent'
import TagsContent from './TagsContent'

import { Wrapper } from './styles'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunityContent')
/* eslint-enable no-unused-vars */

const renderChildContent = (curRoute, store, restProps) => {
  const { pagedPostsData, pagedTagsData } = store

  switch (curRoute.subPath) {
    case ROUTE.POSTS: {
      return <PostsContent data={pagedPostsData} restProps={restProps} />
    }
    case ROUTE.JOBS: {
      return <h3>ROUTE.JOBS</h3>
    }
    case ROUTE.REPOS: {
      return <h3>ROUTE.REPOS</h3>
    }
    case ROUTE.VIDEOS: {
      return <h3>ROUTE.VIDEOS</h3>
    }
    case ROUTE.TAGS: {
      return <TagsContent data={pagedTagsData} restProps={restProps} />
    }
    case ROUTE.EDITORS: {
      return <h2>Editors Content</h2>
    }
    default: {
      return <h2>default</h2>
    }
  }
}

class CommunityContentContainer extends React.Component {
  componentDidMount() {
    const { communityContent } = this.props
    logic.init(communityContent)
  }

  componentWillUnmount() {
    logic.uninit()
  }

  render() {
    const { communityContent } = this.props
    const { curRoute } = communityContent
    const restProps = { ...communityContent }

    return (
      <Wrapper>
        {renderChildContent(curRoute, communityContent, restProps)}
      </Wrapper>
    )
  }
}

export default inject(storePlug('communityContent'))(
  observer(CommunityContentContainer)
)
