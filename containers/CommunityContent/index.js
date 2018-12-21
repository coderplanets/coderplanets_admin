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

const renderChildContent = (route, store, restProps) => {
  const { pagedPostsData, pagedTagsData } = store
  // return <IndexContent data={pagedCommunitiesData} restProps={restProps} />
  // return <PostsContent data={pagedPostsData} restProps={restProps} />

  switch (route.subPath) {
    case ROUTE.TAGS: {
      return <TagsContent data={pagedTagsData} restProps={restProps} />
    }
    case ROUTE.EDITORS: {
      return <h2>Editors Content</h2>
    }
    case ROUTE.POSTS: {
      return <PostsContent data={pagedPostsData} restProps={restProps} />
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
    const { route } = communityContent
    const restProps = { ...communityContent }

    return (
      <Wrapper>
        {renderChildContent(route, communityContent, restProps)}
      </Wrapper>
    )
  }
}

export default inject(storePlug('communityContent'))(
  observer(CommunityContentContainer)
)
