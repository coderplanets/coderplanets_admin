// import R from 'ramda'

import { buildLog } from '@utils'

/* eslint-disable no-unused-vars */
const log = buildLog('L:ApiLayout')
/* eslint-enable no-unused-vars */

let apiLayout = null

export function someMethod() {}

export function init(selectedStore) {
  log(apiLayout)
  apiLayout = selectedStore
}
