/*
 * TutsViewerStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { markStates, buildLog } from '@utils'
/* eslint-disable no-unused-vars */
const log = buildLog('S:TutsViewerStore')
/* eslint-enable no-unused-vars */

const TutsViewerStore = t
  .model('TutsViewerStore', {})
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

export default TutsViewerStore
