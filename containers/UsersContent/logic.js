import { PAGE_SIZE } from '@config'
import { EVENT, TYPE, ROUTE } from '@constant'
import { asyncSuit, buildLog, send, scrollIntoEle } from '@utils'

import S from './schema'

/* eslint-disable no-unused-vars */
const log = buildLog('L:UsersContent')
/* eslint-enable no-unused-vars */

const { SR71, asyncRes, $solver } = asyncSuit
const sr71$ = new SR71({
  recieve: [EVENT.PREVIEW_CLOSE, EVENT.SIDEBAR_MENU_CHANGE],
})

let sub$ = null
let store = null

const commonFilter = page => {
  const size = PAGE_SIZE.D
  return {
    filter: { page, size },
    userHasLogin: false,
  }
}

export const loadUsers = (page = 1) => {
  log('do loadUsers')

  scrollIntoEle(TYPE.APP_HEADER_ID)
  store.mark({ usersLoading: true })
  sr71$.query(S.pagedUsers, commonFilter(page))
}

export function onEdit() {}
export function onDelete() {}

export function cmsPermisstionOnChange(source) {
  send(EVENT.NAV_UPDATE_PERMISSION, {
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

const cancleLoading = () => store.mark({ usersLoading: false })

const DataSolver = [
  {
    match: asyncRes('pagedUsers'),
    action: ({ pagedUsers }) => {
      cancleLoading()
      log('get pagedUsers: ', pagedUsers)
      store.mark({ pagedUsers })
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
          log('unknow event: ', closeType)
          /* return loadPosts() */
        }
      }
    },
  },
  {
    match: asyncRes(EVENT.SIDEBAR_MENU_CHANGE),
    action: res => {
      const { mainPath, subPath } = res[EVENT.SIDEBAR_MENU_CHANGE].data
      log('mainPath  event: ', mainPath)
      log('mainPath  subPath: ', subPath)

      if (mainPath !== ROUTE.USERS) return false
      loadUsers()

      /*
         switch (subPath) {
         case ROUTE.CATEGORIES: {
         return loadCategories()
         }
         case ROUTE.TAGS: {
         return loadTags()
         }
         case ROUTE.THREADS: {
         return loadThreads()
         }
         case ROUTE.POSTS: {
         return loadPosts()
         }
         default: {
         return loadCommunities()
         }
         }
       */
    },
  },
]
const ErrSolver = []

export function init(_store) {
  store = _store

  if (sub$) return false
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}

export function uninit() {
  if (!sub$) return false
  log('===== do uninit')
  // sub$.unsubscribe()
  // sub$ = null
}
