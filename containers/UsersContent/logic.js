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

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:UsersContent')
/* eslint-enable no-unused-vars */

let usersContent = null

const commonFilter = page => {
  const size = PAGE_SIZE.COMMON
  return {
    filter: { page, size },
  }
}

export function loadUsers(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  usersContent.markState({
    usersLoading: true,
  })
  sr71$.query(S.pagedUsers, commonFilter(page))
}

export function onEdit() {}
export function onDelete() {}

export function onCmsPermissionEdit(source) {
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

const cancleLoading = () => {
  usersContent.markState({
    usersLoading: false,
  })
}

const DataSolver = [
  {
    match: asyncRes('pagedUsers'),
    action: ({ pagedUsers }) => {
      cancleLoading()
      usersContent.markState({
        pagedUsers,
      })
    },
  },
]
const ErrSolver = []

export function init(selectedStore) {
  usersContent = selectedStore
  debug(usersContent)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
