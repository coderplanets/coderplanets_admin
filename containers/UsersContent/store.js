/*
 * UsersContentStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { PagedUsers, emptyPagiData } from '@model'
import { markStates, buildLog, stripMobx } from '@utils'
/* eslint-disable no-unused-vars */
const log = buildLog('S:UsersContentStore')
/* eslint-enable no-unused-vars */

const UsersContentStore = t
  .model('UsersContentStore', {
    pagedUsers: t.optional(PagedUsers, emptyPagiData),

    // loading state
    usersLoading: t.optional(t.boolean, false),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get pagedUsersData() {
      return stripMobx(self.pagedUsers)
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

export default UsersContentStore
