/*
 * CommunitiesBannerStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { markStates, makeDebugger } from '@utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:CommunitiesBannerStore')
/* eslint-enable no-unused-vars */

const CommunitiesBannerStore = t
  .model('CommunitiesBannerStore', {
    filteredTotalCount: t.maybeNull(t.number), // communities
    filterdCategoriesCount: t.maybeNull(t.number), // categories
    filterdTagsCount: t.maybeNull(t.number), // tags
    filterdThreadsCount: t.maybeNull(t.number), // threads

    filteredPostsCount: t.maybeNull(t.number), // posts
    filteredJobsCount: t.maybeNull(t.number), // jobs
    filteredReposCount: t.maybeNull(t.number), // repo
    filteredVideosCount: t.maybeNull(t.number), // video
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
    get jobsTotalCount() {
      return self.root.communitiesContent.pagedJobs.totalCount
    },
    get reposTotalCount() {
      return self.root.communitiesContent.pagedRepos.totalCount
    },
    get videosTotalCount() {
      return self.root.communitiesContent.pagedVideos.totalCount
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
