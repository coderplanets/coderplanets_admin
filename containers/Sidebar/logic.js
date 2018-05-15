// import R from 'ramda'
// import store from 'store'

// const debug = makeDebugger('L:sidebar')
import { gqRes, gqErr, $solver, ERR, makeDebugger, EVENT } from '../../utils'
import S from './schema'

import SR71 from '../../utils/network/sr71'

const sr71$ = new SR71({
  resv_event: [EVENT.LOGOUT, EVENT.LOGIN, EVENT.ROUTE_CHANGE],
})

let sidebar = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:Sidebar')
/* eslint-enable no-unused-vars */

export function pin() {
  sidebar.markState({ pin: !sidebar.pin })
}

export function extendMenuBar(communityId) {
  if (sidebar.activeCommunityId === communityId) {
    return sidebar.markState({
      activeCommunityId: null,
    })
  }

  sidebar.markState({
    activeCommunityId: communityId,
    activePart: null,
  })
}

export function onChildMenuChange(activePart) {
  debug('onChildMenuChange: ', activePart)

  sidebar.markState({
    activePart,
  })
}

export function loadCommunities() {
  // const { accountInfo, isLogin } = sidebar
  //  const user = store.get('user')

  // TODO: load manaigedCommunities
  const args = {
    filter: { page: 1, size: 30 },
  }

  console.log('fuck query ---- ?')
  sr71$.query(S.communities, args)
}

const DataSolver = [
  {
    match: gqRes('communities'),
    action: ({ communities }) => {
      debug('communities --- bbb * --> ', communities)
      sidebar.loadCommunities(communities)
    },
  },
  {
    match: gqRes(EVENT.ROUTE_CHANGE),
    action: data => {
      sidebar.syncStateFromhRoute(data[EVENT.ROUTE_CHANGE])
    },
  },
]

const ErrSolver = [
  {
    match: gqErr(ERR.CRAPHQL),
    action: ({ details }) => {
      debug('ERR.CRAPHQL -->', details)
    },
  },
  {
    match: gqErr(ERR.TIMEOUT),
    action: ({ details }) => {
      debug('ERR.TIMEOUT -->', details)
    },
  },
  {
    match: gqErr(ERR.NETWORK),
    action: ({ details }) => {
      debug('ERR.NETWORK -->', details)
    },
  },
]

export function init(selectedStore) {
  sidebar = selectedStore
  sr71$.data().subscribe($solver(DataSolver, ErrSolver))
  //  loadCommunities()
}
