/*
 * CommunitiesContentStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { Community, Post } from '../SharedModel'
import { markStates, makeDebugger, stripMobx } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:CommunitiesContentStore')
/* eslint-enable no-unused-vars */

const PagedCommunities = t.model('PagedCommunities', {
  entries: t.optional(t.array(Community), []),
  pageNumber: t.optional(t.number, 1),
  pageSize: t.optional(t.number, 20), // TODO: USE CONSTANTS
  totalCount: t.optional(t.number, 0),
  totalPages: t.optional(t.number, 0),
})

const PagedPosts = t.model('PagedPosts', {
  entries: t.optional(t.array(Post), []),
  pageNumber: t.optional(t.number, 1),
  pageSize: t.optional(t.number, 20), // TODO: USE CONSTANTS
  totalCount: t.optional(t.number, 0),
  totalPages: t.optional(t.number, 0),
})

const CommunitiesContentStore = t
  .model('CommunitiesContentStore', {
    // all the communities
    pagedCommunities: t.maybe(PagedCommunities),
    pagedPosts: t.maybe(PagedPosts),

    communitiesLoading: t.optional(t.boolean, false),
    postsLoading: t.optional(t.boolean, false),
    category: t.optional(t.string, ''),
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
    get PagedPostsData() {
      return stripMobx(self.pagedPosts)
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CommunitiesContentStore
