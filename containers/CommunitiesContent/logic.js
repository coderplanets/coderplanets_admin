// import R from 'ramda'

import {
  gqRes,
  gqErr,
  $solver,
  ERR,
  makeDebugger,
  EVENT,
  TYPE,
  scrollIntoEle,
} from '../../utils'
import S from './schema'
import SR71 from '../../utils/network/sr71'

const sr71$ = new SR71({
  resv_event: [EVENT.LOGOUT, EVENT.LOGIN],
})

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CommunitiesContent')
/* eslint-enable no-unused-vars */

let communitiesContent = null

export function loadCommunities() {
  const args = {
    filter: { page: 1, size: 20 },
  }
  sr71$.query(S.communities, args)
}

export function pageChange(page) {
  const args = {
    filter: { page, size: 20 },
  }

  communitiesContent.markState({
    communitiesLoading: true,
  })
  scrollIntoEle(TYPE.APP_HEADER_ID)
  sr71$.query(S.communities, args)
}

export function onEdit(record) {
  debug('onEdit', record)
}

export function onDelete(record) {
  debug('onDelete', record)
}

/* when error occured cancle all the loading state */
const cancleLoading = () => {
  communitiesContent.markState({
    communitiesLoading: false,
  })
}

const DataSolver = [
  {
    match: gqRes('communities'),
    action: ({ communities }) => {
      debug('get communities haha: ', communities)
      cancleLoading()
      communitiesContent.markState({
        pagedCommunities: communities,
      })
      // communitiesContent.loadCommunities(communities)
    },
  },
  {
    match: gqRes(EVENT.LOGOUT),
    action: () => loadCommunities(),
  },
  {
    match: gqRes(EVENT.LOGIN),
    action: () => loadCommunities(),
  },
]

const ErrSolver = [
  {
    match: gqErr(ERR.CRAPHQL),
    action: ({ details }) => {
      debug('ERR.CRAPHQL -->', details)
      cancleLoading()
    },
  },
  {
    match: gqErr(ERR.TIMEOUT),
    action: ({ details }) => {
      debug('ERR.TIMEOUT -->', details)
      cancleLoading()
    },
  },
  {
    match: gqErr(ERR.NETWORK),
    action: ({ details }) => {
      debug('ERR.NETWORK -->', details)
      cancleLoading()
    },
  },
]

export function init(selectedStore) {
  communitiesContent = selectedStore
  debug(communitiesContent)
  sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  loadCommunities()
}
