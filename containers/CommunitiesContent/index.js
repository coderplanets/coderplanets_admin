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
import CategoriesContent from './CategoriesContent'
import TagsContent from './TagsContent'
import ThreadsContent from './ThreadsContent'
import { Wrapper } from './styles'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunitiesContent')
/* eslint-enable no-unused-vars */

const renderChildContent = (route, store, restProps) => {
  const {
    pagedCommunitiesData,
    pagedCategoriesData,
    pagedTagsData,
    pagedThreadsData,
    pagedPostsData,
    pagedJobsData,
  } = store

  switch (route.subPath) {
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
    default: {
      return <IndexContent data={pagedCommunitiesData} restProps={restProps} />
    }
  }
}

class CommunitiesContentContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.communitiesContent)
  }

  render() {
    const { communitiesContent } = this.props
    const { route } = communitiesContent
    const restProps = { ...this.props.communitiesContent }

    return (
      <Wrapper>
        {renderChildContent(route, communitiesContent, restProps)}
      </Wrapper>
    )
  }
}

export default inject(storePlug('communitiesContent'))(
  observer(CommunitiesContentContainer)
)
