import R from 'ramda'

import { asyncSuit, buildLog } from '@utils'
import S from './schema'

const { SR71, asyncRes, $solver } = asyncSuit
const sr71$ = new SR71()

/* eslint-disable no-unused-vars */
const log = buildLog('L:Labeler')
/* eslint-enable no-unused-vars */

let sub$ = null
let store = null

export function loadTags() {
  const communityId = store.curCommunity.id
  const thread = R.toUpper(store.curThread)

  const args = { communityId, thread }
  sr71$.query(S.partialTags, args)
}

export function loadTagsIfNeed() {
  loadTags()
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('partialTags'),
    action: ({ partialTags: tags }) => store.mark({ tags }),
  },
]
const ErrSolver = []

export function init(_store) {
  if (store) return false
  store = _store

  log(store)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
