import R from 'ramda'
import { useEffect } from 'react'

import { asyncSuit, buildLog, closePreviewer, TYPE } from '@utils'
import S from './schema'

/* eslint-disable no-unused-vars */
const log = buildLog('L:TagSetter')
/* eslint-enable no-unused-vars */

const { SR71, asyncRes, $solver } = asyncSuit
const sr71$ = new SR71()

let sub$ = null
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

// getPartialTags(editData)

// ###############################
// init & uninit
// ###############################
export const useInit = (_store, editData) => {
  useEffect(
    () => {
      store = _store
      log(store)
      if (sub$) sub$.unsubscribe()
      sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

      getPartialTags(editData)

      return () => {
        if (!sub$) return false
        sub$.unsubscribe()
        sub$ = null
      }
    },
    [_store, editData]
  )
}
