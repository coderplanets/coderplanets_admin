import R from 'ramda'
import { useEffect } from 'react'

import {
  asyncSuit,
  buildLog,
  send,
  EVENT,
  ERR,
  TYPE,
  meteorState,
} from '@utils'

import S from './schema'

const { SR71, $solver, asyncRes, asyncErr } = asyncSuit
const sr71$ = new SR71()

/* eslint-disable no-unused-vars */
const log = buildLog('L:AccountEditor')
/* eslint-enable no-unused-vars */

let store = null
let sub$ = null

export function goBack() {
  send(EVENT.PREVIEW, {
    type: TYPE.PREVIEW_ACCOUNT_VIEW,
  })
}

export const profileChange = R.curry((thread, e) => {
  store.updateUser({
    [thread]: e.target.value,
  })
})

export const sexChange = sex => store.updateUser({ sex })

const updatableAttrs = [
  'nickname',
  'email',
  'location',
  'qq',
  'weibo',
  'weichat',
  'bio',
  'sex',
]

const nilOrEmpty = R.either(R.isNil, R.isEmpty)
const hasValue = R.compose(
  R.not,
  nilOrEmpty
)
const pickUpdatable = R.compose(
  R.pickBy(hasValue),
  R.pick(updatableAttrs)
)

export const updateConfirm = () => {
  if (!store.statusClean) return false
  // TODO: 只去除 null 的即可，如果为空也是合法的
  const editing = pickUpdatable(store.accountInfo)
  const origin = pickUpdatable(store.accountOrigin)
  /* log('editing: ', editing) */
  /* log('origin: ', origin) */

  // TODO: 唯一的限制是 昵称不能为空
  if (R.equals(editing, origin)) {
    meteorState(store, 'warn', 3)
    return false
  }

  store.markState({ updating: true })

  sr71$.mutate(S.updateProfile, { profile: editing })

  /*
  setTimeout(() => {
    store.markState({
      updating: false,
    })
    meteorState(store, 'error', 5, '自定义错误')
  }, 3000)
  */
}

export function cancleEdit() {
  send(EVENT.PREVIEW_CLOSE)
}

export function updateDone() {
  const editing = pickUpdatable(store.accountInfo)
  store.updateOrign(editing)
}

const cancleLoading = () => store.markState({ updating: false })

const DataSolver = [
  {
    match: asyncRes('updateProfile'),
    action: () => {
      meteorState(store, 'success', 3)
      updateDone()
      cancleLoading()
      // communitiesContent.loadCommunities(data)
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.CRAPHQL),
    action: ({ details }) => {
      const errMsg = details[0].detail
      meteorState(store, 'error', 5, errMsg)
      cancleLoading()
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      log('ERR.TIMEOUT -->', details)
      cancleLoading()
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: ({ details }) => {
      log('ERR.NETWORK -->', details)
      cancleLoading()
    },
  },
]

// ###############################
// init & uninit
// ###############################
export const useInit = _store => {
  useEffect(
    () => {
      store = _store
      // log('effect init')
      store.copyAccountInfo()
      sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

      return () => {
        if (sub$) {
          sub$.unsubscribe()
        }
      }
    },
    [_store]
  )
}
