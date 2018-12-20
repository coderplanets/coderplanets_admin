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
    // communities: totalCount of all
    totalCount: t.optional(t.number, 0),
    filteredTotalCount: t.maybeNull(t.number),
    // categories
    categoriesTotalCount: t.optional(t.number, 0),
    filterdCategoriesCount: t.maybeNull(t.number),
    // tags
    tagsTotalCount: t.optional(t.number, 0),
    filterdTagsCount: t.maybeNull(t.number),
    // threads
    threadsTotalCount: t.optional(t.number, 0),
    filterdThreadsCount: t.maybeNull(t.number),
    // posts
    postsTotalCount: t.optional(t.number, 0),
    filteredPostsCount: t.maybeNull(t.number),
    // jobs
    jobsTotalCount: t.optional(t.number, 0),
    filteredJobsCount: t.maybeNull(t.number),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get curRoute() {
      return self.root.curRoute
    },
  }))
  .actions(self => ({
    openDoraemon() {
      self.root.openDoraemon()
    },
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CommunitiesBannerStore
