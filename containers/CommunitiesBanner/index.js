import React from 'react'
import { inject, observer } from 'mobx-react'

import { storePlug, makeDebugger, ROUTE, stripMobx } from '../../utils'

import * as logic from './logic'

import IndexBanner from './IndexBanner'
import EditorsBanner from './EditorsBanner'
import CategoryBanner from './CategoryBanner'
import TagsBanner from './TagsBanner'
import ThreadsBanner from './ThreadsBanner'

import PostsBanner from './PostsBanner'
import JobsBanner from './JobsBanner'

import { BannerContainer } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunitiesBanner')
/* eslint-enable no-unused-vars */

const ChildBanner = ({ curRoute, store }) => {
  const {
    // communities
    totalCount,
    filteredTotalCount,
    // tags
    tagsTotalCount,
    filterdTagsCount,
    // threads
    threadsTotalCount,
    filterdThreadsCount,
    // categories
    categoriesTotalCount,
    filterdCategoriesCount,
    // posts
    postsTotalCount,
    filteredPostsCount,
    // jobs
    jobsTotalCount,
    filteredJobsCount,
  } = store

  switch (curRoute.subPath) {
    case ROUTE.CATEGORIES: {
      return (
        <CategoryBanner
          totalCount={categoriesTotalCount}
          filteredCount={filterdCategoriesCount}
        />
      )
    }

    case ROUTE.TAGS: {
      return (
        <TagsBanner
          totalCount={tagsTotalCount}
          filteredCount={filterdTagsCount}
        />
      )
    }
    case ROUTE.EDITORS: {
      return <EditorsBanner totalCount={102} filteredCount={10} />
    }
    case ROUTE.THREADS: {
      return (
        <ThreadsBanner
          totalCount={threadsTotalCount}
          filteredCount={filterdThreadsCount}
        />
      )
    }
    case ROUTE.POSTS: {
      return (
        <PostsBanner
          totalCount={postsTotalCount}
          filteredCount={filteredPostsCount}
        />
      )
    }
    case ROUTE.JOBS: {
      return (
        <JobsBanner
          totalCount={jobsTotalCount}
          filteredCount={filteredJobsCount}
        />
      )
    }
    default: {
      return (
        <IndexBanner
          totalCount={totalCount}
          filteredCount={filteredTotalCount}
        />
      )
    }
  }
}

class CommunitiesBannerContainer extends React.Component {
  componentWillMount() {
    const { communitiesBanner } = this.props
    logic.init(communitiesBanner)
  }

  render() {
    const { communitiesBanner } = this.props
    const { curRoute } = communitiesBanner

    // console.log('totalCount --> ', communitiesBanner.totalCount)
    return (
      <BannerContainer>
        <ChildBanner curRoute={curRoute} store={stripMobx(communitiesBanner)} />
      </BannerContainer>
    )
  }
}

export default inject(storePlug('communitiesBanner'))(
  observer(CommunitiesBannerContainer)
)
