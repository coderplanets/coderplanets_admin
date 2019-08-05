// import R from 'ramda'
import { useEffect } from 'react'

import { PAGE_SIZE } from '@config'
import { EVENT, ROUTE, TYPE } from '@constant'
import { asyncSuit, buildLog, scrollIntoEle } from '@utils'

import S from './schema'

const { SR71, asyncRes, $solver } = asyncSuit
const sr71$ = new SR71({
  recieve: [EVENT.SIDEBAR_MENU_CHANGE],
})

/* eslint-disable no-unused-vars */
const log = buildLog('L:CommunityContent')
/* eslint-enable no-unused-vars */

let sub$ = null
let store = null

const commonFilter = (page, community = 'home') => {
  const size = PAGE_SIZE.D
  return {
    filter: { page, size, community },
  }
}

export function loadPosts(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.mark({ postsLoading: true })
  const { mainPath: community } = store.curRoute
  sr71$.query(S.pagedPosts, commonFilter(page, community))
}

export function loadJobs(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.mark({ jobsLoading: true })
  const { mainPath: community } = store.curRoute
  sr71$.query(S.pagedJobs, commonFilter(page, community))
}

export function loadVideos(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.mark({ videosLoading: true })
  const { mainPath: community } = store.curRoute
  sr71$.query(S.pagedVideos, commonFilter(page, community))
}

export function loadRepos(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.mark({ reposLoading: true })
  const { mainPath: community } = store.curRoute
  sr71$.query(S.pagedRepos, commonFilter(page, community))
}

export function loadSubscribers(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.mark({ usersLoading: true })

  const size = PAGE_SIZE.D
  const args = {
    id: store.activeCommunity.id,
    filter: { page, size },
  }
  console.log('preview args: ', args)

  sr71$.query(S.communitySubscribers, args)
}

export function loadTags() {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.mark({ tagsLoading: true })

  const { mainPath: community } = store.curRoute
  sr71$.query(S.partialTags, { community, all: true })
}

export function onEdit() {}
export function onDelete() {}

// ###############################
// Data & Error handlers
// ###############################
const cancleLoading = () => {
  store.mark({
    // communitiesLoading: false,
    postsLoading: false,
    jobsLoading: false,
    videosLoading: false,
    reposLoading: false,
    tagsLoading: false,
    usersLoading: false,
  })
}

const DataSolver = [
  {
    match: asyncRes('pagedPosts'),
    action: ({ pagedPosts }) => {
      cancleLoading()
      store.mark({ pagedPosts })
    },
  },
  {
    match: asyncRes('communitySubscribers'),
    action: ({ communitySubscribers: pagedSubscribers }) => {
      cancleLoading()
      console.log('communitySubscribers get: ', pagedSubscribers)

      store.mark({ pagedSubscribers })
    },
  },
  {
    match: asyncRes('pagedJobs'),
    action: ({ pagedJobs }) => {
      cancleLoading()
      store.mark({ pagedJobs })
    },
  },
  {
    match: asyncRes('pagedVideos'),
    action: ({ pagedVideos }) => {
      cancleLoading()
      store.mark({ pagedVideos })
    },
  },
  {
    match: asyncRes('pagedRepos'),
    action: ({ pagedRepos }) => {
      cancleLoading()
      store.mark({ pagedRepos })
    },
  },
  {
    match: asyncRes('partialTags'),
    action: ({ partialTags }) => {
      cancleLoading()
      store.mark({ pagedTags: partialTags })
    },
  },
  {
    match: asyncRes(EVENT.SIDEBAR_MENU_CHANGE),
    action: res => {
      const { /* mainPath */ subPath } = res[EVENT.SIDEBAR_MENU_CHANGE].data
      log('SIDEBAR_MENU_CHANGE ', res[EVENT.SIDEBAR_MENU_CHANGE].data)

      switch (subPath) {
        case ROUTE.TAGS: {
          return loadTags()
        }
        case ROUTE.THREADS: {
          return console.log('todo')
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
        case ROUTE.SUBSCRIBERS: {
          return loadSubscribers()
        }
        default: {
          return console.log('todo: ', subPath)
        }
      }
    },
  },
]
const ErrSolver = []

// ###############################
// init & uninit
// ###############################
export const useInit = _store => {
  useEffect(
    () => {
      store = _store
      if (sub$) sub$.unsubscribe()
      sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

      return () => {
        if (!sub$) return false
        sub$.unsubscribe()
        sub$ = null
      }
    },
    [_store]
  )
}
