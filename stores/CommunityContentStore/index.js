/*
 * CommunityContentStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { Post, Tag } from '../SharedModel'
import { markStates, makeDebugger, stripMobx } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:CommunityContentStore')
/* eslint-enable no-unused-vars */

const PagedPosts = t.model('PagedPosts', {
  entries: t.optional(t.array(Post), []),
  pageNumber: t.optional(t.number, 1),
  pageSize: t.optional(t.number, 20), // TODO: USE CONSTANTS
  totalCount: t.optional(t.number, 0),
  totalPages: t.optional(t.number, 0),
})

const PagedTags = t.model('PagedTags', {
  entries: t.optional(t.array(Tag), []),
  pageNumber: t.optional(t.number, 1),
  pageSize: t.optional(t.number, 20), // TODO: USE CONSTANTS
  totalCount: t.optional(t.number, 0),
  totalPages: t.optional(t.number, 0),
})

const CommunityContentStore = t
  .model('CommunityContentStore', {
    pagedPosts: t.maybe(PagedPosts),
    pagedTags: t.maybe(PagedTags),
    postsLoading: t.optional(t.boolean, false),
    tagsLoading: t.optional(t.boolean, false),
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
    get pagedPostsData() {
      return stripMobx(self.pagedPosts)
    },
    get pagedTagsData() {
      return stripMobx(self.pagedTags)
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CommunityContentStore
