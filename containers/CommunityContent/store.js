/*
 * CommunityContentStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import {
  PagedPosts,
  PagedJobs,
  PagedRepos,
  PagedVideos,
  Tag,
  PagedThreads,
  PagedCategories,
  emptyPagiData,
} from '../../stores/SharedModel'

import { markStates, makeDebugger, stripMobx } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:CommunityContentStore')
/* eslint-enable no-unused-vars */

const CommunityContentStore = t
  .model('CommunityContentStore', {
    pagedPosts: t.optional(PagedPosts, emptyPagiData),
    pagedJobs: t.optional(PagedJobs, emptyPagiData),
    pagedRepos: t.optional(PagedRepos, emptyPagiData),
    pagedVideos: t.optional(PagedVideos, emptyPagiData),

    pagedCategories: t.optional(PagedCategories, emptyPagiData),
    pagedTags: t.optional(t.array(Tag), []),
    pagedThreads: t.optional(PagedThreads, emptyPagiData),

    tagsLoading: t.optional(t.boolean, false),
    categoriesLoading: t.optional(t.boolean, false),
    postsLoading: t.optional(t.boolean, false),
    jobsLoading: t.optional(t.boolean, false),
    reposLoading: t.optional(t.boolean, false),
    videosLoading: t.optional(t.boolean, false),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get curRoute() {
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
      return { entries: stripMobx(self.pagedTags) }
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CommunityContentStore
