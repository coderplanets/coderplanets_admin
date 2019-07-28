import { buildLog } from '@utils'

/* eslint-disable no-unused-vars */
const log = buildLog('L:BodyLayout')
/* eslint-enable no-unused-vars */

let store = null

export function init(_store) {
  store = _store
  log(store)
}

export const holder = 1
