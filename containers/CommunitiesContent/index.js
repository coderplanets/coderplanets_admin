/*
 *
 * CommunitiesContent
 *
 */

import React from 'react'

import { buildLog, connectStore, ROUTE } from '@utils'

import IndexContent from './IndexContent'
import PostsContent from './PostsContent'
import JobsContent from './JobsContent'
import ReposContent from './ReposContent'
import VideosContent from './VideosContent'
import CategoriesContent from './CategoriesContent'
import TagsContent from './TagsContent'
import ThreadsContent from './ThreadsContent'
import { Wrapper } from './styles'

import { useInit } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:CommunitiesContent')
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
    pagedVideosData,
  } = store
  // console.log('render pagedJobsData: ', pagedJobsData)
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
      return <VideosContent data={pagedVideosData} restProps={restProps} />
    }
    default: {
      return <IndexContent data={pagedCommunitiesData} restProps={restProps} />
    }
  }
}

const CommunitiesContentContainer = ({ communitiesContent }) => {
  useInit(communitiesContent)

  const { curRoute } = communitiesContent
  const restProps = { ...communitiesContent }

  return (
    <Wrapper>
      {renderChildContent(curRoute, communitiesContent, restProps)}
    </Wrapper>
  )
}

export default connectStore(CommunitiesContentContainer)
