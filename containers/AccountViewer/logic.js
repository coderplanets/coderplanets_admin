// import R from 'ramda'
import {
  asyncRes,
  asyncErr,
  buildLog,
  $solver,
  ERR,
  send,
  EVENT,
  TYPE,
  Global,
} from '@utils'

import SR71 from 'utils/network/sr71'
import S from './schema'

/* eslint-disable no-unused-vars */
const log = buildLog('L:AccountViewer')
/* eslint-enable no-unused-vars */

const sr71$ = new SR71({
  recieve: [EVENT.LOGIN],
})

let store = null
let sub$ = null

export const loadAccount = () => {
  markLoading(true)

  store.markState({ viewingType: 'account' })
  return sr71$.query(S.user, {})
}

export const loadUser = user => {
  store.markState({ viewingType: 'user', viewingUser: user })
  sr71$.query(S.user, { login: user.login })
}

export const changeTheme = name => store.changeTheme(name)

export const editProfile = () =>
  send(EVENT.PREVIEW_OPEN, { type: TYPE.PREVIEW_ACCOUNT_EDIT })

export const onLogout = () => {
  store.logout()

  setTimeout(() => {
    Global.location.reload(false)
  }, 2000)
  // send(EVENT.LOGOUT)
}

const markLoading = (maybe = true) => store.markState({ loading: maybe })

// ###############################
// Data & Error handlers
// ###############################
const DataSolver = [
  {
    match: asyncRes('user'),
    action: ({ user }) => {
      markLoading(false)
      if (store.viewingType === 'user') {
        return store.markState({ viewingUser: user })
      }
      return store.updateAccount(user)
    },
  },
  {
    match: asyncRes(EVENT.LOGIN),
    action: () => loadAccount(),
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.CRAPHQL),
    action: ({ details }) => {
      log('ERR.CRAPHQL -->', details)
      markLoading(false)
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      log('ERR.TIMEOUT -->', details)
      markLoading(false)
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: ({ details }) => {
      log('ERR.NETWORK -->', details)
      markLoading(false)
    },
  },
]

export const loadUserInfo = user => {
  if (user) return loadUser(user)
  loadAccount()
}

export function init(_store, user) {
  store = _store

  if (sub$) return loadUserInfo(user)
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  return loadUserInfo(user)
}

export function uninit() {
  if (store.loading || !sub$) return false
  log('===== do uninit')
  sub$.unsubscribe()
  sub$ = null
}
