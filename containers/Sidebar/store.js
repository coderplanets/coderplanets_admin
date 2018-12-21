/*
 * SidebarStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
import R from 'ramda'

import { PagedCommunities, emptyPagiData } from '../../stores/SharedModel'

import { makeDebugger, markStates, ROUTE, stripMobx } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:SidebarStore')
/* eslint-enable no-unused-vars */

const RootCountStatus = t.model('RootCountStatus', {
  communitiesCount: t.optional(t.number, 0),
  postsCount: t.optional(t.number, 0),
  jobsCount: t.optional(t.number, 0),
  videosCount: t.optional(t.number, 0),
  reposCount: t.optional(t.number, 0),
  categoriesCount: t.optional(t.number, 0),
  tagsCount: t.optional(t.number, 0),
  threadsCount: t.optional(t.number, 0),
})

const SidebarStore = t
  .model('SidebarStore', {
    // open: t.optional(t.boolean, false),
    pin: t.optional(t.boolean, true),
    searchValue: t.optional(t.string, ''),
    matchedCommunities: t.optional(PagedCommunities, emptyPagiData),
    rootCountStatus: t.optional(RootCountStatus, {}),
    // theme: t.string, // view staff
    // curSelectItem: t.string, // view staff
    // searchBox: t.string, // complex data
    // loading: t.optional(t.boolean, false),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get accountInfo() {
      return self.root.accountInfo
    },
    get isLogin() {
      return self.root.account.isLogin
    },
    get theme() {
      return self.root.theme
    },
    get langs() {
      return self.root.langs
    },
    get getLoading() {
      return self.loading
    },
    get langMessages() {
      return self.root.langMessages
    },
    get activeRaw() {
      return self.root.route.mainPath
    },
    get activeThread() {
      const { subPath } = self.root.route

      return R.isEmpty(subPath) ? ROUTE.COMMUNITIES : subPath
    },
    get rootCountStatusData() {
      return stripMobx(self.rootCountStatus)
    },

    get communitiesTotalCount() {
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

    get countsInfo() {
      const {
        communitiesTotalCount,
        categoriesTotalCount,
        tagsTotalCount,
        threadsTotalCount,
        postsTotalCount,
      } = self

      return {
        communitiesTotalCount,
        categoriesTotalCount,
        tagsTotalCount,
        threadsTotalCount,
        postsTotalCount,
      }
    },

    get subscribedCommunities() {
      if (!R.isEmpty(self.searchValue)) {
        const { entries } = self.matchedCommunities
        return stripMobx(entries)
      }

      const { entries } = self.root.account.user.editableCommunities
      return stripMobx(entries)
    },
  }))
  .actions(self => ({
    markRoute(query) {
      self.root.route.markRoute(query)
    },
    markState(sobj) {
      markStates(sobj, self)
    },
    changeTheme(name) {
      self.root.changeTheme(name)
    },
  }))

export default SidebarStore
