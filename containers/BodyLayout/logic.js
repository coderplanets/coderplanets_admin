import { buildLog } from '@utils'

/* eslint-disable no-unused-vars */
const debug = buildLog('L:BodyLayout')
/* eslint-enable no-unused-vars */

let bodylayout = null

export function openDoraemon() {
  bodylayout.openDoraemon()
}

export function init(selectedStore) {
  bodylayout = selectedStore
}
