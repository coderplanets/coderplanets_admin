// import R from 'ramda'

import { makeDebugger, $solver } from 'utils'

// import S from './schema'
import SR71 from 'utils/network/sr71'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:UsersBanner')
/* eslint-enable no-unused-vars */

let store = null

export function onAdd() {}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = []
const ErrSolver = []

export function init(_store) {
  store = _store
  debug(store)

  if (sub$) return false
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
