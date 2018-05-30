// import R from 'ramda'

import { makeDebugger, $solver, asyncRes } from '../../utils'
import SR71 from '../../utils/network/sr71'
import { PAGE_SIZE } from '../../config'

import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:PermissionEditor')
/* eslint-enable no-unused-vars */

let permissionEditor = null

const commonFilter = page => {
  const size = PAGE_SIZE.COMMON + 10
  return {
    filter: { page, size },
  }
}

export function communitySelect(curCommunityRaw) {
  let curView = 'community'
  if (curCommunityRaw === 'general') {
    curView = 'general'
  }

  permissionEditor.markState({
    curView,
    curCommunityRaw,
  })
}

export function getAllCommunities(page = 1) {
  sr71$.query(S.pagedCommunities, commonFilter(page))
}

export function getAllRules() {
  sr71$.query(S.allPassportRulesString, {})
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('pagedCommunities'),
    action: ({ pagedCommunities }) => {
      permissionEditor.markState({
        pagedCommunities,
      })
    },
  },
  {
    match: asyncRes('allPassportRulesString'),
    action: ({ allPassportRulesString }) => {
      /* console.log('allPassportRulesString --> ', allPassportRulesString) */
      permissionEditor.markState({
        allRules: allPassportRulesString,
      })
    },
  },
]
const ErrSolver = []

export function init(selectedStore) {
  permissionEditor = selectedStore
  debug(permissionEditor)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  getAllCommunities()
  setTimeout(() => {
    getAllRules()
  }, 500)
}
