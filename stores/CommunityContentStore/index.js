/*
 * CommunityContentStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { PagedPosts, PagedTags } from '../SharedModel'
import { markStates, makeDebugger, stripMobx } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:CommunityContentStore')
/* eslint-enable no-unused-vars */

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
      const { mainPath, subPath } = self.root.route
      return {
        mainPath,
        subPath,
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
