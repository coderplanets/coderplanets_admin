// import R from 'ramda'

import {
  makeDebugger,
  $solver,
  asyncRes,
  closePreviewer,
  TYPE,
  THREAD,
} from 'utils'
import SR71 from 'utils/network/sr71'

import { PAGE_SIZE } from 'config'
import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CommunitySetter')
/* eslint-enable no-unused-vars */

let store = null

const commonFilter = page => {
  const size = PAGE_SIZE.D
  return {
    filter: { page, size },
  }
}

export function getAllCommunities(page = 1) {
  sr71$.query(S.pagedCommunities, commonFilter(page))
}

let CurThread = THREAD.POST
export function setCommunity(thread, id, communityId) {
  const args = { thread, id, communityId }

  CurThread = thread
  sr71$.mutate(S.setCommunity, args)
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedCommunities'),
    action: ({ pagedCommunities }) => store.markState({ pagedCommunities }),
  },
  {
    match: asyncRes('setCommunity'),
    action: () => {
      switch (CurThread) {
        case THREAD.JOB: {
          return closePreviewer(TYPE.JOBS_CONTENT_REFRESH)
        }
        default: {
          closePreviewer(TYPE.POSTS_CONTENT_REFRESH)
        }
      }
    },
  },
]
const ErrSolver = []

export function init(selectedStore) {
  store = selectedStore

  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  getAllCommunities()
}
