/*
 * SidebarStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
import R from 'ramda'
import { makeDebugger, markStates, ROUTE, stripMobx } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:SidebarStore')
/* eslint-enable no-unused-vars */

/*
   const validParts = [
   ROUTE.COMMUNITIES,
   ROUTE.COMMUNITY,
   ROUTE.POSTS,
   ROUTE.JOBS,
   ROUTE.ACTIVITIES,
   ROUTE.CHEATSHEETS,
   ROUTE.CATEGORIES,
   ROUTE.EDITORS,
   ROUTE.THREADS,
   ROUTE.TAGS,
   ROUTE.SUBSCRIBERS,

   ROUTE.USERS,
   ROUTE.PAYS,
   ROUTE.PASSPORTS,
   ROUTE.ROLES,
   ]
 */

const SidebarStore = t
  .model('SidebarStore', {
    // open: t.optional(t.boolean, false),
    pin: t.optional(t.boolean, true),
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
    get curPath() {
      return self.root.curPath
    },
    get activeRaw() {
      return self.root.route.mainPath
    },
    get activePart() {
      const { subPath } = self.root.route

      return R.isEmpty(subPath) ? ROUTE.COMMUNITIES : subPath
    },

    get subscribedCommunities() {
      /* const { entries } = self.root.account.subscribedCommunities */
      // TODO use managers communities
      const { entries } = self.root.communities
      return stripMobx(entries)
    },
  }))
  .actions(self => ({
    load() {
      // const communities = self.root.communities.all
    },

    loadCommunities(data) {
      self.root.communities.load(data)
    },

    /*
    loadSubscribedCommunities(data) {
      self.root.account.loadSubscribedCommunities(data)
    },
    */
    markState(sobj) {
      markStates(sobj, self)
    },
    changeTheme(name) {
      self.root.changeTheme(name)
    },
  }))

export default SidebarStore
