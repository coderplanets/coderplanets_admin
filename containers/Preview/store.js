/*
 * PreviewStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'

import { TYPE } from '@constant'
import { markStates, unholdPage, stripMobx } from '@utils'

import { Community, Category, Tag, Post, User } from '@model'

// const log = buildLog('S:PreviewStore')
const Article = t.model('Article', {
  thread: t.string,
  data: Post,
})

const EditPermission = t.model('EditPermission', {
  type: t.string, // TODO: enumeration
  data: User,
})

const PreviewStore = t
  .model('PreviewStore', {
    visible: t.optional(t.boolean, false),
    type: t.maybeNull(
      t.enumeration('previewType', [
        TYPE.POST_PREVIEW_VIEW,
        TYPE.PREVIEW_ACCOUNT_VIEW,
        TYPE.PREVIEW_ACCOUNT_EDIT,
        TYPE.PREVIEW_ROOT_STORE,
        TYPE.PREVIEW_CREATE_POST,
        TYPE.PREVIEW_CREATE_COMMUNITY,
        TYPE.PREVIEW_UPDATE_COMMUNITY,
        // community
        TYPE.PREVIEW_SET_COMMUNITY,
        // tag
        TYPE.PREVIEW_SET_TAG,
        TYPE.PREVIEW_CREATE_TAG,
        TYPE.PREVIEW_UPDATE_TAG,
        // category
        TYPE.PREVIEW_CREATE_CATEGORY,
        TYPE.PREVIEW_SET_CATEGORY,
        TYPE.PREVIEW_UPDATE_CATEGORY,
        // thread
        TYPE.PREVIEW_CREATE_THREAD,
        TYPE.PREVIEW_SET_THREAD,
        // permission
        TYPE.PREVIEW_CREATE_PERMISSION,
        TYPE.PREVIEW_UPDATE_PERMISSION,
      ])
    ),
    editCommunity: t.maybeNull(Community),
    editCategory: t.maybeNull(Category),
    editTag: t.maybeNull(Tag),
    editArticle: t.maybeNull(Article),
    editPermission: t.maybeNull(EditPermission),
    /* editCategory: t.maybeNull(SelectCommunity), */
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get rootState() {
      return stripMobx(self.root)
    },
    get editCommunityData() {
      return stripMobx(self.editCommunity)
    },
    get editCategoryData() {
      return stripMobx(self.editCategory)
    },
    get editTagData() {
      return stripMobx(self.editTag)
    },
    get editArticleData() {
      return stripMobx(self.editArticle)
    },
    get editPermissionData() {
      return stripMobx(self.editPermission)
    },
    get curTheme() {
      return self.root.theme.curTheme
    },
  }))
  .actions(self => ({
    open(type = TYPE.POST_PREVIEW_VIEW) {
      self.visible = true
      self.type = type
    },
    close() {
      self.visible = false
      // self.type = TYPE.PREVIEW_ROOT_STORE
      unholdPage()
    },
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default PreviewStore
