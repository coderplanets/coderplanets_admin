/*
 * UsersBannerStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { markStates, makeDebugger } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:UsersBannerStore')
/* eslint-enable no-unused-vars */

const UsersBannerStore = t
  .model('UsersBannerStore', {
    usersTotalCount: t.optional(t.number, 0),
    filteredUsersCount: t.maybe(t.number),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get filteredCount() {
      if (!self.filteredUsersCount) return self.usersTotalCount
      return self.filteredUsersCount
    },
    get route() {
      const { mainPath, subPath } = self.root.route
      return {
        mainPath,
        subPath,
      }
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default UsersBannerStore
