import R from 'ramda'

import {
  asyncRes,
  makeDebugger,
  $solver,
  closePreviewer,
  TYPE,
} from '../../utils'
import { PAGE_SIZE } from '../../config'

import SR71 from '../../utils/network/sr71'
import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:TagSetter')
/* eslint-enable no-unused-vars */

let tagSetter = null

const commonFilter = page => {
  const size = PAGE_SIZE.COMMON
  return {
    filter: { page, size },
  }
}

export function onAdd(thread, id, tagId, communityId, selectedIds) {
  if (!R.contains(tagId, selectedIds)) {
    const args = { id, tagId, communityId }
    args.thread = R.toUpper(thread)
    sr71$.mutate(S.setTag, args)
  }
}

export function getAllTags(page = 1) {
  sr71$.query(S.pagedTags, commonFilter(page))
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedTags'),
    action: ({ pagedTags }) => {
      tagSetter.markState({
        pagedTags,
      })
    },
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

  getAllTags()
}
