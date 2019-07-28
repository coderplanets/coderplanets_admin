// import R from 'ramda'

import { asyncSuit, buildLog, $solver } from '@utils'

/* eslint-disable no-unused-vars */
const log = buildLog('L:Content')
/* eslint-enable no-unused-vars */

const { SR71 } = asyncSuit
const sr71$ = new SR71()

let sub$ = null
let store = null

export function someMethod() {}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = []
const ErrSolver = []

export function init(selectedStore) {
  store = selectedStore
  log(store)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
