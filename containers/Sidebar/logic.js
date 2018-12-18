import R from 'ramda'
import Router from 'next/router'
/* import store from 'store' */

// const debug = makeDebugger('L:sidebar')
import {
  asyncRes,
  asyncErr,
  $solver,
  ERR,
  makeDebugger,
  EVENT,
  ROUTE,
} from '../../utils'
import S from './schema'
import { PAGE_SIZE } from '../../config'

import SR71 from '../../utils/network/sr71'

const sr71$ = new SR71({
  resv_event: [EVENT.LOGOUT, EVENT.LOGIN, EVENT.ROUTE_CHANGE],
})

let store = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:Sidebar')
/* eslint-enable no-unused-vars */

export function pin() {
  store.markState({ pin: !store.pin })
}

export function extendMenuBar(communityRaw) {
  switch (communityRaw) {
    case ROUTE.COMMUNITIES: {
      /* return Router.push(`/${ROUTE.COMMUNITIES}`, `/${communityRaw}/`) */
      return Router.push(
        {
          pathname: `/${ROUTE.COMMUNITIES}`,
          asPath: `/${communityRaw}/`,
        }
        /* `/${ROUTE.COMMUNITIES}`, `/${communityRaw}/` */
      )
    }
    case ROUTE.USERS: {
      return Router.push(`/${ROUTE.USERS}`, `/${communityRaw}/`)
    }
    default: {
      const asPath = `/${communityRaw}/${ROUTE.POSTS}`
      return Router.push('/', asPath)
    }
  }
}

export function onMenuSelect(mainPath, subPath) {
  store.markRoute({ mainPath, subPath })
}

export function onCommunityChildMenuChange(activeThread) {
  let asPath = `/${store.activeRaw}/${activeThread}`
  if (R.isEmpty(activeThread)) {
    asPath = `/${store.activeRaw}`
  }
  Router.push('/', asPath)
}

export function loadCommunities(page = 1) {
  const size = PAGE_SIZE.D
  const args = {
    filter: { page, size },
  }

  sr71$.query(S.pagedCommunities, args)
}

const DataSolver = [
  {
    match: asyncRes('pagedCommunities'),
    action: ({ pagedCommunities }) => store.loadCommunities(pagedCommunities),
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.CRAPHQL),
    action: ({ details }) => {
      debug('ERR.CRAPHQL -->', details)
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      debug('ERR.TIMEOUT -->', details)
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: ({ details }) => {
      debug('ERR.NETWORK -->', details)
    },
  },
]

export function init(selectedStore) {
  store = selectedStore
  sr71$.data().subscribe($solver(DataSolver, ErrSolver))
  // loadCommunities()
}
