/*
 * CommunitiesContentStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import {
  PagedPosts,
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
    pagedPosts: t.maybe(PagedPosts),
    pagedCategories: t.maybe(PagedCategories),

    communitiesLoading: t.optional(t.boolean, false),
    tagsLoading: t.optional(t.boolean, false),
    categoriesLoading: t.optional(t.boolean, false),
    postsLoading: t.optional(t.boolean, false),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },

    get isLogin() {
      return self.root.account.isLogin
    },

    get route() {
      const { mainQuery, subQuery } = self.root.route
      return {
        mainQuery,
        subQuery,
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
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CommunitiesContentStore
