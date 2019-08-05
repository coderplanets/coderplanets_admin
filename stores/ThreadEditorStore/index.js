/*
* ThreadEditorStore store
*
*/

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { markStates, buildLog } from '@utils'
/* eslint-disable no-unused-vars */
const log = buildLog('S:ThreadEditorStore')
/* eslint-enable no-unused-vars */

const ThreadEditorStore = t
  .model('ThreadEditorStore', {})
  .views(self => ({
    get root() {
      return getParent(self)
    },
  }))
  .actions(self => ({
    mark(sobj) {
      markStates(sobj, self)
    },
  }))

export default ThreadEditorStore
