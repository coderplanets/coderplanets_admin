// import R from 'ramda'

import { asyncSuit, buildLog } from '@utils'

/* eslint-disable no-unused-vars */
const log = buildLog('L:UsersBanner')
/* eslint-enable no-unused-vars */

// import S from './schema'
const { SR71, $solver } = asyncSuit
const sr71$ = new SR71()

let sub$ = null
let store = null

export function onAdd() {}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = []
const ErrSolver = []

export function init(_store) {
  store = _store
  log(store)

  if (sub$) return false
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
