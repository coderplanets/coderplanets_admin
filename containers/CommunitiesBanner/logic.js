// import R from 'ramda'
// import Router from 'next/router'
import {
  asyncRes,
  asyncErr,
  makeDebugger,
  $solver,
  ERR,
  EVENT,
  TYPE,
  dispatchEvent,
} from '../../utils'

import SR71 from '../../utils/network/sr71'

import S from './schema'

const sr71$ = new SR71({
  resv_event: [EVENT.PREVIEW_CLOSE],
})
/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:communitiesBanner')
/* eslint-enable no-unused-vars */

let communitiesBanner = null

export function loadCommunities() {
  sr71$.query(S.pagedCommunities, { filter: {} })
}

export function loadTags() {
  sr71$.query(S.pagedTags, { filter: {} })
}

export function loadThreads() {
  sr71$.query(S.pagedThreads, { filter: {} })
}

export function loadPosts() {
  sr71$.query(S.pagedPosts, { filter: {} })
}

export function loadJobs() {
  sr71$.query(S.pagedJobs, { filter: {} })
}

export const loadCategories = () =>
  sr71$.query(S.pagedCategories, { filter: {} })

export function onAdd(thread) {
  switch (thread) {
    case 'tags': {
      return dispatchEvent(EVENT.NAV_CREATE_TAG, {
        type: TYPE.PREVIEW_CREATE_TAG,
      })
    }
    case 'categories': {
      return dispatchEvent(EVENT.NAV_CREATE_CATEGORY, {
        type: TYPE.PREVIEW_CREATE_CATEGORY,
      })
    }
    default: {
      debug('onAdd thread: ', thread)

      return dispatchEvent(EVENT.NAV_CREATE_COMMUNITY, {
        type: TYPE.PREVIEW_CREATE_COMMUNITY,
      })
    }
  }
}

const DataSolver = [
  {
    match: asyncRes('pagedCommunities'),
    action: ({ pagedCommunities: { totalCount } }) =>
      communitiesBanner.markState({
        totalCount,
      }),
  },
  {
    match: asyncRes('pagedTags'),
    action: ({ pagedTags: { totalCount } }) =>
      communitiesBanner.markState({
        tagsTotalCount: totalCount,
      }),
  },
  {
    match: asyncRes('pagedThreads'),
    action: ({ pagedThreads: { totalCount } }) =>
      communitiesBanner.markState({
        threadsTotalCount: totalCount,
      }),
  },
  {
    match: asyncRes('pagedCategories'),
    action: ({ pagedCategories: { totalCount } }) => {
      communitiesBanner.markState({
        categoriesTotalCount: totalCount,
      })
    },
  },
  {
    match: asyncRes('pagedPosts'),
    action: ({ pagedPosts: { totalCount } }) =>
      communitiesBanner.markState({
        postsTotalCount: totalCount,
      }),
  },
  {
    match: asyncRes('pagedJobs'),
    action: ({ pagedJobs: { totalCount } }) =>
      communitiesBanner.markState({
        jobsTotalCount: totalCount,
      }),
  },
  {
    match: asyncRes(EVENT.PREVIEW_CLOSE),
    action: res => {
      const closeType = res[EVENT.PREVIEW_CLOSE].type
      switch (closeType) {
        case TYPE.COMMUNITIES_REFRESH: {
          return loadCommunities()
        }
        case TYPE.TAGS_REFRESH: {
          return loadTags()
        }
        case TYPE.GATEGORIES_REFRESH: {
          return loadCategories()
        }
        default: {
          debug('unknow event: ', closeType)
          /* return loadPosts() */
        }
      }
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.CRAPHQL),
    action: ({ details }) => {
      debug('ERR.CRAPHQL -->', details)
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      debug('ERR.TIMEOUT -->', details)
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: ({ details }) => {
      debug('ERR.NETWORK -->', details)
    },
  },
]

export function init(selectedStore) {
  communitiesBanner = selectedStore
  sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
