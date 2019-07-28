// import R from 'ramda'
import { useEffect } from 'react'

import { asyncSuit, buildLog } from '@utils'

/* eslint-disable no-unused-vars */
const log = buildLog('L:Banner')
/* eslint-enable no-unused-vars */

const { SR71, $solver } = asyncSuit
const sr71$ = new SR71()

let sub$ = null
let store = null

export function someMethod() {}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = []
const ErrSolver = []

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
        if (sub$) sub$.unsubscribe()
        sub$ = null
      }
    },
    [_store]
  )
}
