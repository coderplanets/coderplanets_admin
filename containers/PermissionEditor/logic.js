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
} from 'utils'
import SR71 from 'utils/network/sr71'
import { PAGE_SIZE } from 'config'

import S from './schema'

const sr71$ = new SR71({
  resv_event: [EVENT.PREVIEW_CLOSED],
})
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:PermissionEditor')
/* eslint-enable no-unused-vars */

let store = null

const commonFilter = page => {
  const size = PAGE_SIZE.M
  return {
    filter: { page, size },
  }
}

export function communitySelect(community) {
  store.markState({
    curView: 'community',
    curCommunityRaw: community.raw,
  })
}

export function communityAddOnSelect() {
  store.markState({
    curView: 'general',
    curCommunityRaw: 'general',
  })
}

export function onRuleClick(rule) {
  /* let selectRules = JSON.parse(permissionEditor.selectRules) */
  const { curCommunityRaw } = store
  let { selectRulesData } = store

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

  store.markState({
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
  const rules = store.selectRules
  sr71$.mutate(S.stampCmsPassport, { userId, rules })
}

const cleanUp = () => {
  store.markState({
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
    action: ({ pagedCommunities }) => store.markState({ pagedCommunities }),
  },
  {
    match: asyncRes('allPassportRulesString'),
    action: ({ allPassportRulesString: allRules }) =>
      store.markState({ allRules }),
  },
  {
    match: asyncRes('stampCmsPassport'),
    action: () => {
      closePreviewer(TYPE.USERS_REFRESH)
      store.markState({ selectRules: '{}' })
    },
  },
  {
    match: asyncRes(EVENT.PREVIEW_CLOSED),
    action: () => cleanUp(),
  },
]
const ErrSolver = []

export function init(selectedStore) {
  store = selectedStore
  debug(store)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  getAllCommunities()
  setTimeout(() => {
    getAllRules()
  }, 500)
}
