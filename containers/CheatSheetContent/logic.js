/* import R from 'ramda' */

import { buildLog, asyncSuit } from '@utils'

const { SR71, $solver } = asyncSuit
const sr71$ = new SR71()

/* eslint-disable no-unused-vars */
const log = buildLog('L:CheatSheetContent')
/* eslint-enable no-unused-vars */

let cheatSheetContent = null

export function someMethod() {}

const DataSolver = []
const ErrSolver = []

export function init(selectedStore) {
  cheatSheetContent = selectedStore
  log(cheatSheetContent)
  sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
