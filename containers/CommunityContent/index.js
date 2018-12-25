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
import JobsContent from './JobsContent'
import TagsContent from './TagsContent'
import VideosContent from './VideosContent'
import ReposContent from './ReposContent'

import { Wrapper } from './styles'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunityContent')
/* eslint-enable no-unused-vars */

const ChildContent = ({
  curRoute,
  pagedPostsData,
  pagedJobsData,
  pagedVideosData,
  pagedReposData,
  pagedTagsData,
  restProps,
}) => {
  switch (curRoute.subPath) {
    case ROUTE.POSTS: {
      return <PostsContent data={pagedPostsData} restProps={restProps} />
    }
    case ROUTE.JOBS: {
      return <JobsContent data={pagedJobsData} restProps={restProps} />
    }
    case ROUTE.REPOS: {
      return <ReposContent data={pagedReposData} restProps={restProps} />
    }
    case ROUTE.VIDEOS: {
      return <VideosContent data={pagedVideosData} restProps={restProps} />
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
    const {
      curRoute,
      pagedPostsData,
      pagedJobsData,
      pagedVideosData,
      pagedReposData,
      pagedTagsData,
    } = communityContent
    const restProps = { ...communityContent }

    return (
      <Wrapper>
        <ChildContent
          curRoute={curRoute}
          pagedPostsData={pagedPostsData}
          pagedJobsData={pagedJobsData}
          pagedVideosData={pagedVideosData}
          pagedReposData={pagedReposData}
          pagedTagsData={pagedTagsData}
          restProps={restProps}
        />
      </Wrapper>
    )
  }
}

export default inject(storePlug('communityContent'))(
  observer(CommunityContentContainer)
)
