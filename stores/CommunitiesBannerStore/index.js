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
    postsTotalCount: t.optional(t.number, 0),
    // categories count
    // editors count
    // ...
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get curTotalCount() {
      const data = self.root.communitiesContent.pagedCommunities
      return data ? data.totalCount : 0
    },

    get curPostsTotalCount() {
      const data = self.root.communitiesContent.pagedPosts
      return data ? data.totalCount : 0
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
