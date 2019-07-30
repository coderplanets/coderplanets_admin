import R from 'ramda'
import { useEffect } from 'react'

import { PAGE_SIZE } from '@config'
import { TYPE } from '@constant'
import { asyncSuit, buildLog, closePreviewer } from '@utils'

import S from './schema'

/* eslint-disable no-unused-vars */
const log = buildLog('L:ThreadSetter')
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

// ###############################
// init & uninit
// ###############################
export const useInit = _store => {
  useEffect(
    () => {
      store = _store
      if (sub$) sub$.unsubscribe()
      sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

      getAllThreads()

      return () => {
        if (!sub$) return false
        sub$.unsubscribe()
        sub$ = null
      }
    },
    [_store]
  )
}
