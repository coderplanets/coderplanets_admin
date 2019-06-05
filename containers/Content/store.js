/*
 * ContentStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { markStates, buildLog } from '@utils'
/* eslint-disable no-unused-vars */
const log = buildLog('S:ContentStore')
/* eslint-enable no-unused-vars */

const ContentStore = t
  .model('ContentStore', {})
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get curRoute() {
      return self.root.curRoute
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default ContentStore
