// import R from 'ramda'

import { makeDebugger, asyncRes, $solver } from '../../utils'
import SR71 from '../../utils/network/sr71'

import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CommunityBanner')
/* eslint-enable no-unused-vars */

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
      store.markState({ postsTotalCount }),
  },
  {
    match: asyncRes('tags'),
    action: ({ tags: { totalCount: tagsTotalCount } }) => {
      store.markState({ tagsTotalCount })
    },
  },
]
const ErrSolver = []

export function init(selectedStore) {
  store = selectedStore

  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
