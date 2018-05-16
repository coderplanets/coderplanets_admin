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
  .model('UsersBannerStore', {})
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get route() {
      const { mainQuery, subQuery } = self.root.route
      return {
        mainQuery,
        subQuery,
      }
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default UsersBannerStore
