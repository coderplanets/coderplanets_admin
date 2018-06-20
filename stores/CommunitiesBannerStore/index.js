/*
 * CommunitiesBannerStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { markStates, makeDebugger, stripMobx } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:CommunitiesBannerStore')
/* eslint-enable no-unused-vars */

const CommunitiesBannerStore = t
  .model('CommunitiesBannerStore', {
    // communities: totalCount of all
    totalCount: t.optional(t.number, 0),
    filteredTotalCount: t.maybe(t.number),
    // categories
    categoriesTotalCount: t.optional(t.number, 0),
    filterdCategoriesCount: t.maybe(t.number),
    // tags
    tagsTotalCount: t.optional(t.number, 0),
    filterdTagsCount: t.maybe(t.number),
    // threads
    threadsTotalCount: t.optional(t.number, 0),
    filterdThreadsCount: t.maybe(t.number),
    // posts
    postsTotalCount: t.optional(t.number, 0),
    filteredPostsCount: t.maybe(t.number),
    // jobs
    jobsTotalCount: t.optional(t.number, 0),
    filteredJobsCount: t.maybe(t.number),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get route() {
      const { mainPath, subPath } = stripMobx(self.root.route)
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

export default CommunitiesBannerStore
