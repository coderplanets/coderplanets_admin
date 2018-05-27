/*
 * PreviewStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'

import { Community, Category } from '../SharedModel'
import { markStates, TYPE, unholdPage, stripMobx } from '../../utils'

// const debug = makeDebugger('S:PreviewStore')

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

        TYPE.PREVIEW_CREATE_TAG,
        TYPE.PREVIEW_UPDATE_TAG,

        TYPE.PREVIEW_CREATE_CATEGORY,
        TYPE.PREVIEW_SET_CATEGORY,
        TYPE.PREVIEW_UPDATE_CATEGORY,
      ])
    ),

    editCommunity: t.maybe(Community),
    editCategory: t.maybe(Category),
    /* editCategory: t.maybe(SelectCommunity), */
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },

    get editingCommunity() {
      return stripMobx(self.editCommunity)
    },
    get editingCategory() {
      return stripMobx(self.editCategory)
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
