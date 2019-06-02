// import R from 'ramda'
// import store from 'store'

import {
  asyncRes,
  asyncErr,
  makeDebugger,
  dispatchEvent,
  EVENT,
  TYPE,
  /* Global, */
  ERR,
  $solver,
  // getParameterByName,
} from '@utils'

import SR71 from 'utils/network/sr71'
// import sr71$ from 'utils/network/sr71_simple'

import S from './schema'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:Header')
/* eslint-enable no-unused-vars */

const sr71$ = new SR71()

let store = null
let sub$ = null
/* const user_token = */

export function previewState() {
  // store.openPreview(type)
  dispatchEvent(EVENT.PREVIEW, {
    type: TYPE.PREVIEW_ROOT_STORE,
  })
}

export function signinGithub(code) {
  debug('signin_github: ', code)
  const args = {
    code,
  }
  sr71$.mutate(S.githubSignin, args)
}

export const checkSesstionState = () => sr71$.query(S.sessionState, {})

export function previewAccount() {
  dispatchEvent(EVENT.PREVIEW, {
    type: TYPE.PREVIEW_ACCOUNT_VIEW,
    data: { hello: 'world --- fuck' },
  })
}

export function login() {
  debug('do login')
  dispatchEvent(EVENT.LOGIN_PANEL)
}

export function openPreview() {
  dispatchEvent(EVENT.PREVIEW, {
    type: TYPE.PREVIEW_ACCOUNT_VIEW,
    data: { hello: 'world' },
  })
}

const DataSolver = [
  {
    match: asyncRes('sessionState'),
    action: ({ sessionState: state }) => store.updateSesstion(state),
  },
  {
    // TODO move it to user side view
    match: asyncRes('githubSigninRes'),
    action: ({ githubSigninRes }) => {
      debug('dataResolver  --->', githubSigninRes)
    },
  },
  {
    match: asyncRes('user'),
    action: ({ user }) => {
      debug('dataResolver userRes  --->', user)
      /* store.set('user', { ...data }) */
      store.updateAccount(user)
    },
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

export function init(_store) {
  store = _store

  if (sub$) return checkSesstionState()

  sr71$.data().subscribe($solver(DataSolver, ErrSolver))
  checkSesstionState()
}

export function uninit() {
  if (!sub$) return false
  debug('===== do uninit')
  sub$.unsubscribe()
  sub$ = null
}
