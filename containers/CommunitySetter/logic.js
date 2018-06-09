// import R from 'ramda'

import {
  makeDebugger,
  $solver,
  asyncRes,
  closePreviewer,
  TYPE,
} from '../../utils'
import SR71 from '../../utils/network/sr71'

import { PAGE_SIZE } from '../../config'
import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CommunitySetter')
/* eslint-enable no-unused-vars */

let communitySetter = null

const commonFilter = page => {
  const size = PAGE_SIZE.COMMON
  return {
    filter: { page, size },
  }
}

export function getAllCommunities(page = 1) {
  sr71$.query(S.pagedCommunities, commonFilter(page))
}

export function setCommunity(thread, id, communityId) {
  const args = { thread, id, communityId }

  sr71$.mutate(S.setCommunity, args)
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedCommunities'),
    action: ({ pagedCommunities }) => {
      communitySetter.markState({
        pagedCommunities,
      })
    },
  },
  {
    match: asyncRes('setCommunity'),
    action: () => closePreviewer(TYPE.POSTS_CONTENT_REFRESH),
  },
]
const ErrSolver = []

export function init(selectedStore) {
  communitySetter = selectedStore
  debug(communitySetter)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  getAllCommunities()
}
