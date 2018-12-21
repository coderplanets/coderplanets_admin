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
    // totalCount: t.optional(t.number, 0),
    filteredTotalCount: t.maybeNull(t.number),
    // categories
    filterdCategoriesCount: t.maybeNull(t.number),
    // tags
    filterdTagsCount: t.maybeNull(t.number),
    // threads
    filterdThreadsCount: t.maybeNull(t.number),
    // posts
    // postsTotalCount: t.optional(t.number, 0),
    filteredPostsCount: t.maybeNull(t.number),
    // jobs
    jobsTotalCount: t.optional(t.number, 0),
    filteredJobsCount: t.maybeNull(t.number),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get totalCount() {
      return self.root.communitiesContent.pagedCommunities.totalCount
    },
    get categoriesTotalCount() {
      return self.root.communitiesContent.pagedCategories.totalCount
    },
    get tagsTotalCount() {
      return self.root.communitiesContent.pagedTags.totalCount
    },
    get threadsTotalCount() {
      return self.root.communitiesContent.pagedThreads.totalCount
    },
    get postsTotalCount() {
      return self.root.communitiesContent.pagedPosts.totalCount
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
