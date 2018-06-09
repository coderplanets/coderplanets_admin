import R from 'ramda'

import {
  asyncRes,
  makeDebugger,
  $solver,
  closePreviewer,
  TYPE,
} from '../../utils'

import SR71 from '../../utils/network/sr71'
import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:TagSetter')
/* eslint-enable no-unused-vars */

let tagSetter = null

/*
const commonFilter = page => {
  const size = PAGE_SIZE.COMMON
  return {
    filter: { page, size },
  }
}
*/

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
  tagSetter.markState({
    activeCommunityRaw: community.raw,
  })

  const args = {
    communityId: community.id,
    thread: tagSetter.activeThread,
  }

  sr71$.query(S.partialTags, args)
}

export function selectThread(activeThread) {
  tagSetter.markState({
    activeThread,
  })
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedTags'),
    action: ({ pagedTags }) =>
      tagSetter.markState({
        pagedTags,
      }),
  },
  {
    match: asyncRes('partialTags'),
    action: ({ partialTags }) =>
      tagSetter.markState({
        tags: partialTags,
      }),
  },
  {
    match: asyncRes('setTag'),
    action: () => closePreviewer(TYPE.POSTS_CONTENT_REFRESH),
  },
]
const ErrSolver = []

export function init(selectedStore) {
  tagSetter = selectedStore
  debug(tagSetter)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  /* getAllTags() */
}
