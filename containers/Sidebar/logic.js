import R from 'ramda'
/* import store from 'store' */

// const log = buildLog('L:sidebar')
import { PAGE_SIZE } from '@config'
import { asyncSuit, buildLog, send } from '@utils'
import { EVENT, ERR, ROUTE } from '@constant'

import S from './schema'

/* eslint-disable no-unused-vars */
const log = buildLog('L:Sidebar')
/* eslint-enable no-unused-vars */

const { SR71, asyncRes, asyncErr, $solver } = asyncSuit
const sr71$ = new SR71({
  recieve: [EVENT.LOGOUT, EVENT.LOGIN, EVENT.ROUTE_CHANGE],
})

let store = null
let sub$ = null

export const pin = () => store.mark({ pin: !store.pin })

export function extendMenuBar(communityRaw) {
  switch (communityRaw) {
    case ROUTE.COMMUNITIES: {
      return store.markRoute({ mainPath: ROUTE.COMMUNITIES, subPath: 'index' })
    }
    case ROUTE.USERS: {
      return store.markRoute({ mainPath: ROUTE.USERS, subPath: 'index' })
    }
    default: {
      onRootMenuSelect(communityRaw, ROUTE.POSTS)
      return loadCommunity(communityRaw)
    }
  }
}

export function onRootMenuSelect(mainPath, subPath) {
  store.markRoute({ mainPath, subPath })

  send(EVENT.SIDEBAR_MENU_CHANGE, {
    data: { mainPath, subPath },
  })
}

export const loadCommunity = raw => sr71$.query(S.community, { raw })

export function loadCommunities(page = 1) {
  const size = PAGE_SIZE.D
  const args = {
    filter: { page, size },
  }

  sr71$.query(S.pagedCommunities, args)
}

export const loadCountStatus = () => sr71$.query(S.countStatus, {})

export const searchCommunities = title =>
  sr71$.query(S.searchCommunities, { title })

export const searchOnChange = e => {
  const searchValue = e.target.value
  store.mark({ searchValue })
  if (!R.isEmpty(searchValue)) {
    searchCommunities(searchValue)
  }
}

// ###############################
// Data & Error handlers
// ###############################
const DataSolver = [
  {
    match: asyncRes('community'),
    action: ({ community: activeCommunity }) =>
      store.mark({ activeCommunity }),
  },
  {
    match: asyncRes('pagedCommunities'),
    action: ({ pagedCommunities }) => store.loadCommunities(pagedCommunities),
  },
  {
    match: asyncRes('searchCommunities'),
    action: ({ searchCommunities: matchedCommunities }) => {
      store.mark({ matchedCommunities })
    },
  },
  {
    match: asyncRes('countStatus'),
    action: ({ countStatus: rootCountStatus }) => {
      store.mark({ rootCountStatus })
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.CRAPHQL),
    action: ({ details }) => {
      log('ERR.CRAPHQL -->', details)
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      log('ERR.TIMEOUT -->', details)
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: ({ details }) => {
      log('ERR.NETWORK -->', details)
    },
  },
]

export function init(selectedStore) {
  store = selectedStore
  if (sub$) return loadCountStatus()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
  loadCountStatus()
  // loadCommunities()
}

export function uninit() {
  if (!sub$) return false

  log('===== do uninit')
  sub$.unsubscribe()
  sub$ = null
}
