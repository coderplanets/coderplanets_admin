// import R from 'ramda'
import { useEffect } from 'react'

import { asyncSuit, buildLog } from '@utils'

import S from './schema'

/* eslint-disable no-unused-vars */
const log = buildLog('L:CommunityBanner')
/* eslint-enable no-unused-vars */

const { SR71, asyncRes, $solver } = asyncSuit
const sr71$ = new SR71()

let sub$ = null
let store = null

export function loadPosts() {
  sr71$.query(S.pagedPosts, { filter: {} })
}

// TODO: should be loadSubscribers
export function loadUsers() {}

export function onAdd() {}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedPosts'),
    action: ({ pagedPosts: { totalCount: postsTotalCount } }) =>
      store.mark({ postsTotalCount }),
  },
  {
    match: asyncRes('tags'),
    action: ({ tags: { totalCount: tagsTotalCount } }) => {
      store.mark({ tagsTotalCount })
    },
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

      return () => {
        if (!sub$) return false
        sub$.unsubscribe()
        sub$ = null
      }
    },
    [_store]
  )
}
