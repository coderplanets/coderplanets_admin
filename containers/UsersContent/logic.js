import {
  makeDebugger,
  asyncRes,
  // asyncErr,
  $solver,
  // ERR,
  EVENT,
  TYPE,
  dispatchEvent,
  scrollIntoEle,
} from '../../utils'
import { PAGE_SIZE } from '../../config'

import S from './schema'
import SR71 from '../../utils/network/sr71'

const sr71$ = new SR71({
  resv_event: [EVENT.PREVIEW_CLOSE],
})
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:UsersContent')
/* eslint-enable no-unused-vars */

let store = null

const commonFilter = page => {
  const size = PAGE_SIZE.D
  return {
    filter: { page, size },
  }
}

export function loadUsers(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.markState({ usersLoading: true })
  sr71$.query(S.pagedUsers, commonFilter(page))
}

export function onEdit() {}
export function onDelete() {}

export function onCmsPermissionMutate(source) {
  dispatchEvent(EVENT.NAV_UPDATE_PERMISSION, {
    type: TYPE.PREVIEW_UPDATE_PERMISSION,
    data: {
      type: 'cms',
      source,
    },
  })
}

// ###############################
// Data & Error handlers
// ###############################

const cancleLoading = () => store.markState({ usersLoading: false })

const DataSolver = [
  {
    match: asyncRes('pagedUsers'),
    action: ({ pagedUsers }) => {
      cancleLoading()
      store.markState({ pagedUsers })
    },
  },
  {
    match: asyncRes(EVENT.PREVIEW_CLOSE),
    action: res => {
      const closeType = res[EVENT.PREVIEW_CLOSE].type
      switch (closeType) {
        case TYPE.USERS_REFRESH: {
          const { pageNumber } = store.pagedUsersData
          return loadUsers(pageNumber)
        }
        default: {
          debug('unknow event: ', closeType)
          /* return loadPosts() */
        }
      }
    },
  },
]
const ErrSolver = []

export function init(selectedStore) {
  store = selectedStore

  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
