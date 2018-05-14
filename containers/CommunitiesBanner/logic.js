// import R from 'ramda'
// import Router from 'next/router'
import {
  gqRes,
  gqErr,
  makeDebugger,
  $solver,
  ERR,
  EVENT,
  TYPE,
  dispatchEvent,
} from '../../utils'

import SR71 from '../../utils/network/sr71'

import S from './schema'

const sr71$ = new SR71()
/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:communitiesBanner')
/* eslint-enable no-unused-vars */

let communitiesBanner = null

export function loadCommunities() {
  sr71$.query(S.communities, { filter: { page: 1, size: 20 } })
}

export function onAdd() {
  debug('onAdd')
  dispatchEvent(EVENT.NAV_CREATE_COMMUNITY, {
    type: TYPE.PREVIEW_CREATE_COMMUNITY,
  })
}

const DataSolver = [
  {
    match: gqRes('communities'),
    action: ({ communities: { totalCount } }) =>
      communitiesBanner.markState({
        totalCount,
      }),
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
  communitiesBanner = selectedStore
  sr71$.data().subscribe($solver(DataSolver, ErrSolver))
  loadCommunities()
}
