// import R from 'ramda'
import { useEffect } from 'react'

import { asyncSuit, buildLog, closePreviewer, updateEditing, ERR } from '@utils'

import S from './schema'

/* eslint-disable no-unused-vars */
const log = buildLog('L:ThreadEditor')
/* eslint-enable no-unused-vars */

const { SR71, asyncRes, asyncErr, $solver } = asyncSuit
const sr71$ = new SR71()

let sub$ = null
let store = null

export const mutateConfirm = () =>
  sr71$.mutate(S.createThread, store.editThreadData)

export function cancleEdit() {
  store.markState({
    community: {},
    isEdit: false,
  })
  closePreviewer()
}

export const inputOnChange = (part, e) => updateEditing(store, part, e)

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('createThread'),
    action: () => {
      closePreviewer()
      // closePreviewer(TYPE.COMMUNITIES_REFRESH)
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.CRAPHQL),
    action: ({ details }) => {
      log('ERR.CRAPHQL -->', details)
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      log('ERR.TIMEOUT -->', details)
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: ({ details }) => {
      log('ERR.NETWORK -->', details)
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
      log(store)
      if (sub$) sub$.unsubscribe()
      sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

      return () => {
        if (!sub$) return false
        sub$.unsubscribe()
        sub$ = null
      }
    },
    [_store]
  )
}
