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
    filteredUsersCount: t.maybeNull(t.number),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get totalCount() {
      return self.root.usersContent.pagedUsers.totalCount
    },
    get filteredCount() {
      return self.filteredUsersCount
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

export default UsersBannerStore
