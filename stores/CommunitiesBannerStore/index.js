/*
 * CommunitiesBannerStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { markStates, makeDebugger } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:CommunitiesBannerStore')
/* eslint-enable no-unused-vars */

const CommunitiesBannerStore = t
  .model('CommunitiesBannerStore', {
    // totalCount of all the communities
    totalCount: t.optional(t.number, 0),
    // categories count
    // editors count
    // ...
  })
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

export default CommunitiesBannerStore
