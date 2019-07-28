import R from 'ramda'
import { useEffect } from 'react'
import { message } from 'antd'

import { PAGE_SIZE } from '@config'

import {
  asyncSuit,
  ERR,
  buildLog,
  EVENT,
  TYPE,
  THREAD,
  ROUTE,
  scrollIntoEle,
  closePreviewer,
  send,
} from '@utils'

import S from './schema'

/* eslint-disable no-unused-vars */
const log = buildLog('L:CommunitiesContent')
/* eslint-enable no-unused-vars */

const { SR71, asyncRes, asyncErr, $solver } = asyncSuit
const sr71$ = new SR71({
  recieve: [
    EVENT.LOGOUT,
    EVENT.LOGIN,
    EVENT.PREVIEW_CLOSE,
    EVENT.SIDEBAR_MENU_CHANGE,
  ],
})

let sub$ = null
let store = null

const commonFilter = page => {
  const size = PAGE_SIZE.D
  return {
    filter: { page, size },
  }
}

export function loadCommunities(page = 1) {
  const size = PAGE_SIZE.D
  const args = {
    filter: { page, size },
    userHasLogin: false,
  }
  scrollIntoEle(TYPE.APP_HEADER_ID)

  store.markState({ communitiesLoading: true })
  store.markRoute({ page })

  /* args.filter = R.merge(args.filter, route.query) */
  sr71$.query(S.pagedCommunities, args)
}

export function loadCategories(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markRoute({ page })
  store.markState({ categoriessLoading: true })

  sr71$.query(S.pagedCategories, commonFilter(page))
}

export function loadTags(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)

  store.markRoute({ page })
  store.markState({ tagsLoading: true })

  sr71$.query(S.pagedTags, commonFilter(page))
}

export function loadThreads(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markRoute({ page })
  store.markState({ tagsLoading: true })

  sr71$.query(S.pagedThreads, commonFilter(page))
}

export const loadPosts = (page = 1) => {
  const size = PAGE_SIZE.D
  const args = {
    filter: { page, size },
    userHasLogin: false,
  }
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markState({ postsLoading: true })

  sr71$.query(S.pagedPosts, args)
}

export const loadJobs = (page = 1) => {
  const size = PAGE_SIZE.D
  const args = {
    filter: { page, size },
  }
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markState({ jobsLoading: true })

  sr71$.query(S.pagedJobs, args)
}

export const loadRepos = (page = 1) => {
  const size = PAGE_SIZE.D
  const args = {
    filter: { page, size },
  }
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markState({ reposLoading: true })

  sr71$.query(S.pagedRepos, args)
}

export const loadVideos = (page = 1) => {
  const size = PAGE_SIZE.D
  const args = {
    filter: { page, size },
  }
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markState({ videosLoading: true })

  sr71$.query(S.pagedVideos, args)
}

export function onEdit(record) {
  log('unMatched edit: ', record)
}

export const onEditCategory = record =>
  send(EVENT.NAV_UPDATE_CATEGORY, {
    type: TYPE.PREVIEW_UPDATE_CATEGORY,
    data: record,
  })

export const onEditTag = record =>
  send(EVENT.NAV_UPDATE_TAG, {
    type: TYPE.PREVIEW_UPDATE_TAG,
    data: record,
  })

// TODO rename to onDeleteCommunity
export function onDelete(record) {
  sr71$.mutate(S.deleteCommunity, { id: record.id })
}

export function onDeleteTag(record) {
  const args = { id: record.id, communityId: record.community.id }
  sr71$.mutate(S.deleteTag, args)
}

export function onDeleteCagegory(record) {
  const args = { id: record.id }
  sr71$.mutate(S.deleteCategory, args)
}

export const setCommunity = (thread, source) =>
  send(EVENT.NAV_SET_COMMUNITY, {
    type: TYPE.PREVIEW_SET_COMMUNITY,
    data: {
      source,
      thread,
    },
  })

let CurThread = THREAD.POST
export function unsetCommunity(thread, source, communityId) {
  const args = {
    thread,
    communityId,
    id: source.id,
  }

  CurThread = thread
  sr71$.mutate(S.unsetCommunity, args)
}

export const unsetThread = (communityId, thread) =>
  sr71$.mutate(S.unsetThread, {
    threadId: thread.id,
    communityId,
  })

export const setThread = source =>
  send(EVENT.NAV_SET_THREAD, {
    type: TYPE.PREVIEW_SET_THREAD,
    data: source,
  })

export const unsetCategory = (communityId, category) =>
  sr71$.mutate(S.unsetCategory, {
    communityId,
    categoryId: category.id,
  })

export const setCategory = source =>
  send(EVENT.NAV_SET_CATEGORY, {
    type: TYPE.PREVIEW_SET_CATEGORY,
    data: source,
  })

export const setTag = (thread, source) =>
  send(EVENT.NAV_SET_TAG, {
    type: TYPE.PREVIEW_SET_TAG,
    data: {
      thread,
      source,
    },
  })

export function unsetTag(threadId, tag) {
  const args = {
    thread: R.toUpper(tag.thread),
    id: threadId,
    tagId: tag.id,
    communityId: tag.community.id,
  }
  sr71$.mutate(S.unsetTag, args)
}

/* when error occured cancle all the loading state */
const cancleLoading = () =>
  store.markState({
    communitiesLoading: false,
    postsLoading: false,
    jobsLoading: false,
    reposLoading: false,
    videosLoading: false,
    tagsLoading: false,
    categoriessLoading: false,
  })

const DataSolver = [
  {
    match: asyncRes('pagedCommunities'),
    action: ({ pagedCommunities }) => {
      cancleLoading()
      log('pagedCommunities: ', pagedCommunities)
      store.markState({ pagedCommunities })
    },
  },
  {
    match: asyncRes('pagedTags'),
    action: ({ pagedTags }) => {
      log('load pagedTags: ', pagedTags)
      cancleLoading()
      store.markState({ pagedTags })
    },
  },
  {
    match: asyncRes('pagedThreads'),
    action: ({ pagedThreads }) => {
      cancleLoading()
      store.markState({ pagedThreads })
    },
  },
  {
    match: asyncRes('pagedPosts'),
    action: ({ pagedPosts }) => {
      cancleLoading()
      store.markState({ pagedPosts })
    },
  },
  {
    match: asyncRes('pagedJobs'),
    action: ({ pagedJobs }) => {
      console.log('pagedJobs get: ', pagedJobs)
      cancleLoading()
      store.markState({ pagedJobs })
    },
  },
  {
    match: asyncRes('pagedRepos'),
    action: ({ pagedRepos }) => {
      cancleLoading()
      store.markState({ pagedRepos })
    },
  },
  {
    match: asyncRes('pagedVideos'),
    action: ({ pagedVideos }) => {
      cancleLoading()
      log('pagedVideos: ', pagedVideos)
      store.markState({ pagedVideos })
    },
  },
  {
    match: asyncRes('pagedCategories'),
    action: ({ pagedCategories }) => {
      cancleLoading()
      log('pagedCategories: ', pagedCategories)
      store.markState({ pagedCategories })
    },
  },
  {
    match: asyncRes('deleteCommunity'),
    action: () => closePreviewer(TYPE.COMMUNITIES_REFRESH),
  },
  {
    match: asyncRes('unsetCommunity'),
    action: () => {
      switch (CurThread) {
        case THREAD.JOB: {
          const { pageNumber } = store.pagedJobsData
          return loadJobs(pageNumber)
        }
        default: {
          const { pageNumber } = store.pagedPostsData
          return loadPosts(pageNumber)
        }
      }
    },
  },
  {
    match: asyncRes('unsetCategory'),
    action: () => loadCommunities(),
  },
  {
    match: asyncRes('unsetThread'),
    action: () => loadCommunities(),
  },
  {
    match: asyncRes('unsetTag'),
    action: () => loadPosts(),
  },
  {
    match: asyncRes('deleteTag'),
    action: () => loadTags(),
  },
  {
    match: asyncRes('deleteCategory'),
    action: () => loadCategories(),
  },
  {
    match: asyncRes(EVENT.LOGOUT),
    action: () => loadCommunities(),
  },
  {
    match: asyncRes(EVENT.LOGIN),
    action: () => loadCommunities(),
  },
  {
    match: asyncRes(EVENT.PREVIEW_CLOSE),
    action: res => {
      const closeType = res[EVENT.PREVIEW_CLOSE].type
      log('PREVIEW_CLOSE --> ', closeType)
      switch (closeType) {
        case TYPE.COMMUNITIES_REFRESH: {
          const { pageNumber } = store.pagedCommunitiesData
          return loadCommunities(pageNumber)
        }
        case TYPE.TAGS_REFRESH: {
          const { pageNumber } = store.pagedTagsData
          return loadTags(pageNumber)
        }
        case TYPE.GATEGORIES_REFRESH: {
          const { pageNumber } = store.pagedCategoriesData
          return loadCategories(pageNumber)
        }
        case TYPE.POSTS_CONTENT_REFRESH: {
          const { pageNumber } = store.pagedPostsData
          return loadPosts(pageNumber)
        }
        case TYPE.JOBS_CONTENT_REFRESH: {
          const { pageNumber } = store.pagedJobsData
          return loadJobs(pageNumber)
        }
        default: {
          log('unknow event: ', closeType)
          /* return loadPosts() */
        }
      }
    },
  },
  {
    match: asyncRes(EVENT.SIDEBAR_MENU_CHANGE),
    action: res => {
      const { mainPath, subPath } = res[EVENT.SIDEBAR_MENU_CHANGE].data
      if (mainPath !== ROUTE.COMMUNITIES) return false

      switch (subPath) {
        case ROUTE.CATEGORIES: {
          return loadCategories()
        }
        case ROUTE.TAGS: {
          return loadTags()
        }
        case ROUTE.THREADS: {
          return loadThreads()
        }
        case ROUTE.POSTS: {
          return loadPosts()
        }
        case ROUTE.JOBS: {
          return loadJobs()
        }
        case ROUTE.REPOS: {
          return loadRepos()
        }
        case ROUTE.VIDEOS: {
          return loadVideos()
        }
        default: {
          return loadCommunities()
        }
      }
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.CRAPHQL),
    action: ({ details }) => {
      log('ERR.CRAPHQL -->', details[0].detail)
      message.error(details[0].detail)
      cancleLoading()
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      log('ERR.TIMEOUT -->', details)
      cancleLoading()
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: ({ details }) => {
      log('ERR.NETWORK -->', details)
      cancleLoading()
    },
  },
]

// ###############################
// init & uninit
// ###############################
export const useInit = _store => {
  useEffect(
    () => {
      store = _store
      if (sub$) return false
      sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

      return () => {
        if (!sub$) return false
        log('===== do uninit')
        sub$.unsubscribe()
        sub$ = null
      }
    },
    [_store]
  )
}
