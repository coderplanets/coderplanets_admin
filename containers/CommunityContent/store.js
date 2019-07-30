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
  PagedUsers,
  Tag,
  PagedThreads,
  PagedCategories,
  emptyPagiData,
} from '@model'

import { markStates, buildLog, stripMobx } from '@utils'
/* eslint-disable no-unused-vars */
const log = buildLog('S:CommunityContentStore')
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

    pagedSubscribers: t.optional(PagedUsers, emptyPagiData),

    tagsLoading: t.optional(t.boolean, false),
    categoriesLoading: t.optional(t.boolean, false),
    postsLoading: t.optional(t.boolean, false),
    jobsLoading: t.optional(t.boolean, false),
    reposLoading: t.optional(t.boolean, false),
    videosLoading: t.optional(t.boolean, false),
    usersLoading: t.optional(t.boolean, false),
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
    get pagedJobsData() {
      return stripMobx(self.pagedJobs)
    },
    get pagedVideosData() {
      return stripMobx(self.pagedVideos)
    },
    get pagedReposData() {
      return stripMobx(self.pagedRepos)
    },
    get pagedTagsData() {
      return { entries: stripMobx(self.pagedTags) }
    },
    get pagedThreadsData() {
      return { entries: self.root.sidebar.activeCommunityData.threads }
    },
    get pagedSubscribersData() {
      return stripMobx(self.pagedSubscribers)
    },
    get activeCommunity() {
      return self.root.sidebar.activeCommunityData
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CommunityContentStore
