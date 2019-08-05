import R from 'ramda'
import { useEffect } from 'react'

import { PAGE_SIZE } from '@config'
import { TYPE } from '@constant'
import { asyncSuit, buildLog, closePreviewer } from '@utils'

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
      store.mark({
        pagedCategories,
      }),
  },
  {
    match: asyncRes('setCategory'),
    action: () => closePreviewer(TYPE.COMMUNITIES_REFRESH),
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

      getAllCategories()

      return () => {
        if (sub$) sub$.unsubscribe()
        sub$ = null
      }
    },
    [_store]
  )
}
