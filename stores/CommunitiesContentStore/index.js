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
  PagedThreads,
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
    pagedCategories: t.maybe(PagedCategories),
    pagedTags: t.maybe(PagedTags),
    pagedThreads: t.maybe(PagedThreads),

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
    get curRoute() {
      return self.root.curRoute
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
    get pagedThreadsData() {
      return stripMobx(self.pagedThreads)
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
    markRoute(query) {
      self.root.route.markRoute(query)
    },
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CommunitiesContentStore
