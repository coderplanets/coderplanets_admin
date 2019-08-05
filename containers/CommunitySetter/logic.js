// import R from 'ramda'
import { useEffect } from 'react'

import { PAGE_SIZE } from '@config'
import { TYPE, THREAD } from '@constant'
import { asyncSuit, buildLog, closePreviewer } from '@utils'

import S from './schema'

const { SR71, asyncRes, $solver } = asyncSuit
const sr71$ = new SR71()

/* eslint-disable no-unused-vars */
const log = buildLog('L:CommunitySetter')
/* eslint-enable no-unused-vars */

let sub$ = null
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
    action: ({ pagedCommunities }) => store.mark({ pagedCommunities }),
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

// ###############################
// init & uninit
// ###############################
export const useInit = (_store, editData) => {
  useEffect(
    () => {
      store = _store
      if (sub$) sub$.unsubscribe()
      sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

      getAllCommunities()

      return () => {
        if (!sub$) return false
        sub$.unsubscribe()
        sub$ = null
      }
    },
    [_store, editData]
  )
}
