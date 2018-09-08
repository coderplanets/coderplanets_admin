import R from 'ramda'

import {
  makeDebugger,
  $solver,
  asyncRes,
  closePreviewer,
  TYPE,
} from '../../utils'
import { PAGE_SIZE } from '../../config'

import SR71 from '../../utils/network/sr71'
import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:ThreadSetter')
/* eslint-enable no-unused-vars */

let store = null

const commonFilter = page => {
  const size = PAGE_SIZE.COMMON
  return {
    filter: { page, size },
  }
}

export function getAllThreads(page = 1) {
  sr71$.query(S.pagedThreads, commonFilter(page))
}

export function onAdd(communityId, threadId, selectedids) {
  if (!R.contains(threadId, selectedids)) {
    sr71$.mutate(S.setThread, { communityId, threadId })
  }
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedThreads'),
    action: ({ pagedThreads }) => store.markState({ pagedThreads }),
  },
  {
    match: asyncRes('setThread'),
    action: () => closePreviewer(TYPE.COMMUNITIES_REFRESH),
  },
]
const ErrSolver = []

export function init(selectedStore) {
  store = selectedStore
  debug(store)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  getAllThreads()
}
