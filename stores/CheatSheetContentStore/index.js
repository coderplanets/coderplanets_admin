/*
 * CheatSheetContentStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { markStates, makeDebugger } from '@utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:CheatSheetContentStore')
/* eslint-enable no-unused-vars */

const CheatSheetContentStore = t
  .model('CheatSheetContentStore', {})
  .views(self => ({
    get root() {
      return getParent(self)
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CheatSheetContentStore
