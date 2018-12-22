/*
 *
 * CommunitiesContent
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
// import Link from 'next/link'
/* import { withRouter } from 'next/router' */

import { makeDebugger, storePlug, ROUTE } from '../../utils'

import IndexContent from './IndexContent'
import PostsContent from './PostsContent'
import JobsContent from './JobsContent'
import ReposContent from './ReposContent'
import CategoriesContent from './CategoriesContent'
import TagsContent from './TagsContent'
import ThreadsContent from './ThreadsContent'
import { Wrapper } from './styles'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunitiesContent')
/* eslint-enable no-unused-vars */

const renderChildContent = (curRoute, store, restProps) => {
  const {
    pagedCommunitiesData,
    pagedCategoriesData,
    pagedTagsData,
    pagedThreadsData,
    pagedPostsData,
    pagedJobsData,
    pagedReposData,
  } = store
  console.log('render pagedReposData: ', pagedReposData)

  switch (curRoute.subPath) {
    case ROUTE.TAGS: {
      return <TagsContent data={pagedTagsData} restProps={restProps} />
    }
    case ROUTE.THREADS: {
      return <ThreadsContent data={pagedThreadsData} restProps={restProps} />
    }
    case ROUTE.CATEGORIES: {
      return (
        <CategoriesContent data={pagedCategoriesData} restProps={restProps} />
      )
    }
    case ROUTE.EDITORS: {
      return <h2>Editors Content</h2>
    }
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
      return <h3>VIDEOS Content</h3>
    }
    default: {
      return <IndexContent data={pagedCommunitiesData} restProps={restProps} />
    }
  }
}

class CommunitiesContentContainer extends React.Component {
  componentDidMount() {
    const { communitiesContent } = this.props

    logic.init(communitiesContent)
  }

  componentWillUnmount() {
    logic.uninit()
  }

  render() {
    const { communitiesContent } = this.props
    const { curRoute } = communitiesContent
    const restProps = { ...communitiesContent }

    return (
      <Wrapper>
        {renderChildContent(curRoute, communitiesContent, restProps)}
      </Wrapper>
    )
  }
}

export default inject(storePlug('communitiesContent'))(
  observer(CommunitiesContentContainer)
)
