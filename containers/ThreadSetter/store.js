/*
 * ThreadSetterStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { PagedThreads } from 'stores/SharedModel'
import { markStates, makeDebugger, stripMobx } from '@utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:ThreadSetterStore')
/* eslint-enable no-unused-vars */

const ThreadSetterStore = t
  .model('ThreadSetterStore', {
    pagedThreads: t.maybeNull(PagedThreads),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get pagedThreadsData() {
      return stripMobx(self.pagedThreads)
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default ThreadSetterStore
