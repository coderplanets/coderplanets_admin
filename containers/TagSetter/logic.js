import R from 'ramda'

import { asyncRes, makeDebugger, $solver, closePreviewer, TYPE } from '@utils'

import SR71 from 'utils/network/sr71'
import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:TagSetter')
/* eslint-enable no-unused-vars */

let store = null

export function onAdd(thread, id, tagId, communityId, selectedIds) {
  if (!R.contains(tagId, selectedIds)) {
    const args = { id, tagId, communityId }
    args.thread = R.toUpper(thread)
    sr71$.mutate(S.setTag, args)
  }
}

export function getPartialTags({ thread, data: { communities } }) {
  if (R.isEmpty(communities)) return false

  selectThread(thread)
  selectCommunity(communities[0])
}

export function selectCommunity(community) {
  store.markState({ activeCommunityRaw: community.raw })

  const args = {
    communityId: community.id,
    thread: store.activeThread,
  }

  sr71$.query(S.partialTags, args)
}

export function selectThread(activeThread) {
  store.markState({ activeThread })
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedTags'),
    action: ({ pagedTags }) => store.markState({ pagedTags }),
  },
  {
    match: asyncRes('partialTags'),
    action: ({ partialTags: tags }) => store.markState({ tags }),
  },
  {
    match: asyncRes('setTag'),
    action: () => closePreviewer(TYPE.POSTS_CONTENT_REFRESH),
  },
]
const ErrSolver = []

export function init(selectedStore) {
  store = selectedStore
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  /* getAllTags() */
}
