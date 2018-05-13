/*
 * SidebarStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
import R from 'ramda'
import { makeDebugger, markStates, TYPE } from '../../utils'
/* import MenuItem from './MenuItemStore' */

const menuItemConveter = R.compose(
  R.map(item => ({
    id: item.id,
    title: item.title,
    raw: item.raw,
    logo: item.logo,
    contributesDigest: item.contributesDigest,
    target: {
      href: {
        pathname: '/',
        query: {
          main: R.toLower(item.raw),
          sub: 'posts', // default to posts
        },
      },
      as: {
        // pathname: `/${R.toLower(item.raw)}/posts`,
        pathname: `/${R.toLower(item.raw)}`,
      },
    },
  })),
  R.values
)

/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:SidebarStore')
/* eslint-enable no-unused-vars */

const validParts = [
  TYPE.C_UTILS,
  TYPE.C_POSTS,
  TYPE.C_JOBS,
  TYPE.C_ACTIVITIES,
  TYPE.C_CHEATSHEETS,
  TYPE.C_EDITORS,
  TYPE.C_THREADS,
  TYPE.C_TAGS,
  TYPE.C_SUBSCRIBERS,
  TYPE.C_R_TOP,
  TYPE.C_R_CATEGORIES,
  TYPE.C_R_EDITORS,
  TYPE.C_R_POSTS,
  TYPE.U_R_REGISTER,
  TYPE.U_R_PAYS,
  TYPE.U_R_PASSPORTS,
  TYPE.U_R_ROLES,
]
const SidebarStore = t
  .model('SidebarStore', {
    // open: t.optional(t.boolean, false),
    pin: t.optional(t.boolean, true),
    activeCommunityId: t.maybe(t.string),
    activePart: t.maybe(t.enumeration('activePart', validParts)),
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
    get subscribedCommunities() {
      const { entries } = self.root.account.subscribedCommunities
      return menuItemConveter(entries)
    },
  }))
  .actions(self => ({
    load() {
      // const communities = self.root.communities.all
    },

    loadSubscribedCommunities(data) {
      self.root.account.loadSubscribedCommunities(data)
    },
    markState(sobj) {
      markStates(sobj, self)
    },
    changeTheme(name) {
      self.root.changeTheme(name)
    },
  }))

export default SidebarStore
