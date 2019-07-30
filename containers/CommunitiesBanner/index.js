import React from 'react'

import { ROUTE } from '@constant'
import { connectStore, buildLog, stripMobx } from '@utils'

import IndexBanner from './IndexBanner'
import EditorsBanner from './EditorsBanner'
import CategoryBanner from './CategoryBanner'
import TagsBanner from './TagsBanner'
import ThreadsBanner from './ThreadsBanner'

import PostsBanner from './PostsBanner'
import JobsBanner from './JobsBanner'
import ReposBanner from './ReposBanner'
import VideosBanner from './VideosBanner'

import { BannerContainer } from './styles'
import { useInit } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:CommunitiesBanner')
/* eslint-enable no-unused-vars */

const ChildBanner = ({
  curRoute,
  totalCount,
  tagsTotalCount,
  categoriesTotalCount,
  threadsTotalCount,
  postsTotalCount,
  jobsTotalCount,
  reposTotalCount,
  videosTotalCount,
  restProps,
}) => {
  const {
    // communities
    filteredTotalCount,
    // tags
    filterdTagsCount,
    // threads
    filterdThreadsCount,
    // categories
    filterdCategoriesCount,
    // posts
    filteredPostsCount,
    // jobs
    filteredJobsCount,
    // repo
    filteredReposCount,
    // video
    filteredVideosCount,
  } = restProps

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
    case ROUTE.REPOS: {
      return (
        <ReposBanner
          totalCount={reposTotalCount}
          filteredCount={filteredReposCount}
        />
      )
    }
    case ROUTE.VIDEOS: {
      return (
        <VideosBanner
          totalCount={videosTotalCount}
          filteredCount={filteredVideosCount}
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

const CommunitiesBannerContainer = ({ communitiesBanner }) => {
  useInit(communitiesBanner)

  const {
    curRoute,
    totalCount,
    tagsTotalCount,
    categoriesTotalCount,
    threadsTotalCount,
    postsTotalCount,
    jobsTotalCount,
    reposTotalCount,
    videosTotalCount,
  } = communitiesBanner

  return (
    <BannerContainer>
      <ChildBanner
        curRoute={curRoute}
        totalCount={totalCount}
        categoriesTotalCount={categoriesTotalCount}
        threadsTotalCount={threadsTotalCount}
        tagsTotalCount={tagsTotalCount}
        postsTotalCount={postsTotalCount}
        jobsTotalCount={jobsTotalCount}
        reposTotalCount={reposTotalCount}
        videosTotalCount={videosTotalCount}
        restProps={stripMobx(communitiesBanner)}
      />
    </BannerContainer>
  )
}

export default connectStore(CommunitiesBannerContainer)
