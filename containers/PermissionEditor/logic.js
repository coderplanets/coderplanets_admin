import R from 'ramda'

import {
  makeDebugger,
  $solver,
  asyncRes,
  mapKey,
  mapValue,
  TYPE,
  EVENT,
  closePreviewer,
} from '../../utils'
import SR71 from '../../utils/network/sr71'
import { PAGE_SIZE } from '../../config'

import S from './schema'

const sr71$ = new SR71({
  resv_event: [EVENT.PREVIEW_CLOSED],
})
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

export function communitySelect(community) {
  permissionEditor.markState({
    curView: 'community',
    curCommunityRaw: community.raw,
  })
}

export function communityAddOnSelect() {
  permissionEditor.markState({
    curView: 'general',
    curCommunityRaw: 'general',
  })
}

export function onRuleClick(rule) {
  /* let selectRules = JSON.parse(permissionEditor.selectRules) */
  const { curCommunityRaw } = permissionEditor
  let { selectRulesData } = permissionEditor

  if (curCommunityRaw === 'general') {
    selectRulesData = R.merge(selectRulesData, {
      [mapKey(rule)]: !mapValue(rule),
    })
  } else {
    const curCommunitySelectRules = R.mergeDeepRight(selectRulesData, {
      [curCommunityRaw]: {
        [mapKey(rule)]: !mapValue(rule),
      },
    })

    selectRulesData = R.merge(selectRulesData, curCommunitySelectRules)
  }

  permissionEditor.markState({
    selectRules: JSON.stringify(selectRulesData),
  })
}

export function getAllCommunities(page = 1) {
  sr71$.query(S.pagedCommunities, commonFilter(page))
}

export function getAllRules() {
  sr71$.query(S.allPassportRulesString, {})
}

export function confirm(userId) {
  const rules = permissionEditor.selectRules
  sr71$.mutate(S.stampCmsPassport, { userId, rules })
}

const cleanUp = () => {
  permissionEditor.markState({
    selectRules: '{}',
    curView: 'general',
    curCommunityRaw: 'general',
  })
}

export function onCancle() {
  cleanUp()
  closePreviewer()
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
      permissionEditor.markState({
        allRules: allPassportRulesString,
      })
    },
  },
  {
    match: asyncRes('stampCmsPassport'),
    action: () => {
      closePreviewer(TYPE.USERS_REFRESH)
      permissionEditor.markState({
        selectRules: '{}',
      })
    },
  },
  {
    match: asyncRes(EVENT.PREVIEW_CLOSED),
    action: () => {
      cleanUp()
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
