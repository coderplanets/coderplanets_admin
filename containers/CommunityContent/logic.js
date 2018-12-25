// import R from 'ramda'

import {
  asyncRes,
  // asyncErr,
  $solver,
  // ERR,
  makeDebugger,
  EVENT,
  ROUTE,
  TYPE,
  scrollIntoEle,
} from '../../utils'
import { PAGE_SIZE } from '../../config'

import S from './schema'

import SR71 from '../../utils/network/sr71'

const sr71$ = new SR71({
  resv_event: [EVENT.SIDEBAR_MENU_CHANGE],
})

let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CommunityContent')
/* eslint-enable no-unused-vars */

let store = null

const commonFilter = (page, community = 'home') => {
  const size = PAGE_SIZE.D
  return {
    filter: { page, size, community },
  }
}

export function loadPosts(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markState({ postsLoading: true })
  const { mainPath: community } = store.curRoute
  sr71$.query(S.pagedPosts, commonFilter(page, community))
}

export function loadJobs(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markState({ jobsLoading: true })
  const { mainPath: community } = store.curRoute
  sr71$.query(S.pagedJobs, commonFilter(page, community))
}

export function loadVideos(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markState({ videosLoading: true })
  const { mainPath: community } = store.curRoute
  sr71$.query(S.pagedVideos, commonFilter(page, community))
}

export function loadRepos(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markState({ reposLoading: true })
  const { mainPath: community } = store.curRoute
  sr71$.query(S.pagedRepos, commonFilter(page, community))
}

export function loadTags() {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markState({ tagsLoading: true })

  const { mainPath: community } = store.curRoute
  sr71$.query(S.partialTags, { community, all: true })
}

export function onEdit() {}
export function onDelete() {}

// ###############################
// Data & Error handlers
// ###############################
const cancleLoading = () => {
  store.markState({
    // communitiesLoading: false,
    postsLoading: false,
    jobsLoading: false,
    videosLoading: false,
    reposLoading: false,
    tagsLoading: false,
  })
}

const DataSolver = [
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
      cancleLoading()
      store.markState({ pagedJobs })
    },
  },
  {
    match: asyncRes('pagedVideos'),
    action: ({ pagedVideos }) => {
      cancleLoading()
      store.markState({ pagedVideos })
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
    match: asyncRes('partialTags'),
    action: ({ partialTags }) => {
      cancleLoading()
      store.markState({ pagedTags: partialTags })
    },
  },
  {
    match: asyncRes(EVENT.SIDEBAR_MENU_CHANGE),
    action: res => {
      const { /* mainPath */ subPath } = res[EVENT.SIDEBAR_MENU_CHANGE].data
      debug('SIDEBAR_MENU_CHANGE ', res[EVENT.SIDEBAR_MENU_CHANGE].data)

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
        default: {
          return console.log('todo')
        }
      }
    },
  },
]
const ErrSolver = []

export function init(selectedStore) {
  store = selectedStore
  debug(store)
  if (sub$) return false
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}

export function uninit() {
  if (!sub$) return false
  debug('===== do uninit')
  sub$.unsubscribe()
  sub$ = null
}
