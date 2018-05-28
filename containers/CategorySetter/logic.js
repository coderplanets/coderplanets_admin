import R from 'ramda'

import {
  makeDebugger,
  $solver,
  TYPE,
  asyncRes,
  closePreviewer,
} from '../../utils'
import { PAGE_SIZE } from '../../config'

import SR71 from '../../utils/network/sr71'
import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CategorySetter')
/* eslint-enable no-unused-vars */

let categorySetter = null

const commonFilter = page => {
  const size = PAGE_SIZE.COMMON
  return {
    filter: { page, size },
  }
}

export function getAllCategories(page = 1) {
  debug('getAllCategories ..')
  sr71$.query(S.pagedCategories, commonFilter(page))
}

export function onAdd(communityId, categoryId, selectedCids) {
  if (!R.contains(categoryId, selectedCids)) {
    sr71$.mutate(S.setCategory, { communityId, categoryId })
  }
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedCategories'),
    action: ({ pagedCategories }) => {
      debug('pagedCategories done! ', pagedCategories)

      categorySetter.markState({
        pagedCategories,
      })
    },
  },
  {
    match: asyncRes('setCategory'),
    action: () => closePreviewer(TYPE.COMMUNITIES_REFRESH),
  },
]

const ErrSolver = []

export function init(selectedStore) {
  categorySetter = selectedStore
  debug(categorySetter)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
  getAllCategories()
}
