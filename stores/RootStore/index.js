/*
 * rootStore store
 *
 */

import { types as t } from 'mobx-state-tree'
import { buildLog, markStates } from '@utils'

import CommunitiesStore from '../CommunitiesStore'
import { ThemeStore, ThemeDefaults } from '../ThemeStore'

import {
  // domain
  RouteStore,
  UsersStore,
  AccountStore,
  BodylayoutStore,
  PostsStore,
  ApiLayoutStore,
  HeaderStore,
  // banner
  BannerStore,
  CommunitiesBannerStore,
  CommunityBannerStore,
  UsersBannerStore,
  // content
  ContentStore,
  CommunitiesContentStore,
  CommunityContentStore,
  UsersContentStore,
  // editors
  CommunityEditorStore,
  ThreadEditorStore,
  TagEditorStore,
  CategoryEditorStore,
  PermissionEditorStore,
  // setter
  CategorySetterStore,
  TagSetterStore,
  CommunitySetterStore,
  ThreadSetterStore,
  // viewers
  ArticleViwerStore,
  AccountViewerStore,
  CommentsStore,
  // toolbox
  PreviewStore,
  SidebarStore,
  TypeWriterStore,
  AccountEditorStore,
  DocUploaderStore,
} from '../index'

/* eslint-disable no-unused-vars */
const log = buildLog('S:rootStore')
/* eslint-enable no-unused-vars */

const rootStore = t
  .model({
    // domain stores
    account: t.optional(AccountStore, {}),
    users: t.maybeNull(UsersStore),
    route: t.optional(RouteStore, {}),
    communities: t.optional(CommunitiesStore, {}),
    posts: t.optional(PostsStore, {}),
    comments: t.optional(CommentsStore, {}),
    theme: t.optional(ThemeStore, ThemeDefaults),
    appLocale: t.optional(t.enumeration('locale', ['zh', 'en']), 'zh'),
    appLangs: t.map(t.frozen),

    // toolbox
    sidebar: t.optional(SidebarStore, { menuItems: [] }),
    preview: t.optional(PreviewStore, { visible: false }),
    docUploader: t.optional(DocUploaderStore, {}),

    // layouts
    bodylayout: t.optional(BodylayoutStore, {}),
    apiLayout: t.optional(ApiLayoutStore, {}),
    header: t.optional(HeaderStore, {}),

    // banner
    banner: t.optional(BannerStore, {}),
    communitiesBanner: t.optional(CommunitiesBannerStore, {}),
    communityBanner: t.optional(CommunityBannerStore, {}),
    usersBanner: t.optional(UsersBannerStore, {}),

    // content
    content: t.optional(ContentStore, {}),
    communitiesContent: t.optional(CommunitiesContentStore, {}),
    communityContent: t.optional(CommunityContentStore, {}),
    usersContent: t.optional(UsersContentStore, {}),

    // eiditors
    typeWriter: t.optional(TypeWriterStore, {}),
    accountEditor: t.optional(AccountEditorStore, {}),
    communityEditor: t.optional(CommunityEditorStore, {}),
    threadEditor: t.optional(ThreadEditorStore, {}),
    tagEditor: t.optional(TagEditorStore, {}),
    categoryEditor: t.optional(CategoryEditorStore, {}),
    permissionEditor: t.optional(PermissionEditorStore, {}),
    // setter
    categorySetter: t.optional(CategorySetterStore, {}),
    tagSetter: t.optional(TagSetterStore, {}),
    communitySetter: t.optional(CommunitySetterStore, {}),
    threadSetter: t.optional(ThreadSetterStore, {}),

    // viewers (for preview usage)
    articleViwer: t.optional(ArticleViwerStore, {}),
    accountViewer: t.optional(AccountViewerStore, {}),
  })
  .views(self => ({
    get locale() {
      return self.appLocale
    },
    get langs() {
      return self.appLangs
    },
    get langMessages() {
      // TODO: try - catch
      // return self.langs.toJSON()[self.appLocale]
      return self.langs.get(self.locale)
    },
    get doraemonVisible() {
      // TODO self.doraemon.visible
      return self.doraemon.visible
    },
    get curRoute() {
      return self.route.curRoute
    },
    get accountInfo() {
      return self.account.accountInfo
    },
  }))
  .actions(self => ({
    afterCreate() {
      // self.communities.load()
      // self.sidebar.load()
      // self.posts.load()
    },
    setHeaderFix(fix) {
      self.header.setFix(fix)
    },
    openPreview(type) {
      self.preview.open(type)
    },
    closePreview() {
      self.preview.close()
    },
    changeTheme(name) {
      self.theme.changeTheme(name)
    },
    changeLocale(locale) {
      self.appLocale = locale
    },
    setLangMessages(key, val) {
      // self.appLangs.set({ en: { fic: 2 } })
      self.appLangs.set(key, val)
    },
    isLocaleExist(locale) {
      return !!self.langs.get(locale)
    },
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default rootStore
