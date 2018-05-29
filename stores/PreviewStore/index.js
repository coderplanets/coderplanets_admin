/*
 * PreviewStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'

// import { CMS_PARTS } from '../../config'

import { Community, Category, Post } from '../SharedModel'
import { markStates, TYPE, unholdPage, stripMobx } from '../../utils'

// const debug = makeDebugger('S:PreviewStore')
const Article = t.model('Article', {
  part: t.string, // t.optional(t.enumeration('part', CMS_PARTS), CMS_PARTS[0]),
  data: Post,
})

const PreviewStore = t
  .model('PreviewStore', {
    visible: t.optional(t.boolean, false),
    type: t.maybe(
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
      ])
    ),
    editCommunity: t.maybe(Community),
    editCategory: t.maybe(Category),
    editArticle: t.maybe(Article),
    /* editCategory: t.maybe(SelectCommunity), */
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
    get editArticleData() {
      return stripMobx(self.editArticle)
    },
    get themeKeys() {
      return self.root.theme.themeKeys
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
