/*
 * CommunitiesContentStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import {
  PagedPosts,
  PagedJobs,
  PagedTags,
  PagedCategories,
  PagedCommunities,
} from '../SharedModel'
import { markStates, makeDebugger, stripMobx } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:CommunitiesContentStore')
/* eslint-enable no-unused-vars */

const CommunitiesContentStore = t
  .model('CommunitiesContentStore', {
    // all the communities
    pagedCommunities: t.maybe(PagedCommunities),
    pagedTags: t.maybe(PagedTags),
    pagedCategories: t.maybe(PagedCategories),

    pagedPosts: t.maybe(PagedPosts),
    pagedJobs: t.maybe(PagedJobs),

    communitiesLoading: t.optional(t.boolean, false),
    tagsLoading: t.optional(t.boolean, false),
    categoriesLoading: t.optional(t.boolean, false),
    postsLoading: t.optional(t.boolean, false),
    jobsLoading: t.optional(t.boolean, false),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },

    get isLogin() {
      return self.root.account.isLogin
    },

    get route() {
      const { mainPath, subPath, query } = self.root.route
      const queryObj = stripMobx(query)

      if (queryObj.page) queryObj.page = parseInt(queryObj.page, 10)
      if (queryObj.size) queryObj.size = parseInt(queryObj.size, 10)

      return {
        mainPath,
        subPath,
        query: queryObj,
      }
    },
    get pagedCommunitiesData() {
      return stripMobx(self.pagedCommunities)
    },
    get pagedCategoriesData() {
      return stripMobx(self.pagedCategories)
    },
    get pagedTagsData() {
      return stripMobx(self.pagedTags)
    },
    get pagedPostsData() {
      return stripMobx(self.pagedPosts)
    },
    get pagedJobsData() {
      return stripMobx(self.pagedJobs)
    },
  }))
  .actions(self => ({
    /* ssrLoad(data, mainPath = 'communities') { */
    /* self.pagedCommunities = data */
    /* }, */
    markQuery(query) {
      self.root.route.markQuery(query)
    },
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CommunitiesContentStore
