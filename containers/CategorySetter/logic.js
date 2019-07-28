import R from 'ramda'

import { asyncSuit, buildLog, TYPE, closePreviewer } from '@utils'
import { PAGE_SIZE } from '@config'

import S from './schema'

/* eslint-disable no-unused-vars */
const log = buildLog('L:CategorySetter')
/* eslint-enable no-unused-vars */

const { SR71, asyncRes, $solver } = asyncSuit
const sr71$ = new SR71()
let sub$ = null

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
