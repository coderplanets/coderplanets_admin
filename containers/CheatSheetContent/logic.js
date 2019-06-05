/* import R from 'ramda' */

import { buildLog, $solver } from '@utils'
import SR71 from 'utils/network/sr71'

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
