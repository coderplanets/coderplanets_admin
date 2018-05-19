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
import { PAGE_SIZE } from '../../config'
import S from './schema'
import SR71 from '../../utils/network/sr71'

const sr71$ = new SR71({
  resv_event: [EVENT.LOGOUT, EVENT.LOGIN],
})

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CommunitiesContent')
/* eslint-enable no-unused-vars */

let communitiesContent = null

export function loadCommunities(page = 1) {
  const size = PAGE_SIZE.COMMON
  const args = {
    filter: { page, size },
  }
  communitiesContent.markState({
    communitiesLoading: true,
  })
  scrollIntoEle(TYPE.APP_HEADER_ID)
  sr71$.query(S.communities, args)
}

export function loadPosts(page = 1) {
  const size = PAGE_SIZE.COMMON
  const args = {
    filter: { page, size },
  }
  scrollIntoEle(TYPE.APP_HEADER_ID)
  communitiesContent.markState({
    postsLoading: true,
  })
  sr71$.query(S.pagedPosts, args)
}

const commonFilter = page => {
  const size = PAGE_SIZE.COMMON
  return {
    filter: { page, size },
  }
}

export function loadTags(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  communitiesContent.markState({
    tagsLoading: true,
  })
  sr71$.query(S.tags, commonFilter(page))
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
    postsLoading: false,
    tagsLoading: false,
  })
}

const DataSolver = [
  {
    match: gqRes('communities'),
    action: ({ communities }) => {
      cancleLoading()
      communitiesContent.markState({
        pagedCommunities: communities,
      })
    },
  },
  {
    match: gqRes('tags'),
    action: ({ tags }) => {
      cancleLoading()
      communitiesContent.markState({
        pagedTags: tags,
      })
    },
  },
  {
    match: gqRes('pagedPosts'),
    action: ({ pagedPosts }) => {
      cancleLoading()
      communitiesContent.markState({
        pagedPosts,
      })
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

  // loadCommunities()
}
