// import R from 'ramda'

import {
  asyncRes,
  // asyncErr,
  $solver,
  // ERR,
  makeDebugger,
  // EVENT,
  TYPE,
  scrollIntoEle,
} from '../../utils'
import { PAGE_SIZE } from '../../config'

import S from './schema'

import SR71 from '../../utils/network/sr71'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CommunityContent')
/* eslint-enable no-unused-vars */

let store = null

const commonFilter = page => {
  const size = PAGE_SIZE.D
  return {
    filter: { page, size },
  }
}

export function loadPosts(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markState({ postsLoading: true })

  sr71$.query(S.pagedPosts, commonFilter(page))
}

export function loadTags(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markState({ tagsLoading: true })

  sr71$.query(S.pagedTags, commonFilter(page))
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
    // tagsLoading: false,
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
    match: asyncRes('pagedTags'),
    action: ({ pagedTags }) => {
      cancleLoading()
      store.markState({ pagedTags })
    },
  },
]
const ErrSolver = []

export function init(selectedStore) {
  store = selectedStore
  debug(store)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
