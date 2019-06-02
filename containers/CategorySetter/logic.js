import R from 'ramda'

import { makeDebugger, $solver, TYPE, asyncRes, closePreviewer } from '@utils'
import { PAGE_SIZE } from '@config'

import SR71 from 'utils/network/sr71'
import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CategorySetter')
/* eslint-enable no-unused-vars */

let store = null

const commonFilter = page => {
  const size = PAGE_SIZE.D
  return {
    filter: { page, size },
  }
}

export function getAllCategories(page = 1) {
  sr71$.query(S.pagedCategories, commonFilter(page))
}

export function onAdd(communityId, categoryId, selectedids) {
  if (!R.contains(categoryId, selectedids)) {
    sr71$.mutate(S.setCategory, { communityId, categoryId })
  }
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedCategories'),
    action: ({ pagedCategories }) =>
      store.markState({
        pagedCategories,
      }),
  },
  {
    match: asyncRes('setCategory'),
    action: () => closePreviewer(TYPE.COMMUNITIES_REFRESH),
  },
]

const ErrSolver = []

export function init(selectedStore) {
  store = selectedStore
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  getAllCategories()
}
