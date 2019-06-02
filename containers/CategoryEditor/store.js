/*
 * CategoryEditorStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
import R from 'ramda'

import { Category } from 'stores/SharedModel'
import { markStates, makeDebugger, stripMobx } from '@utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:CategoryEditorStore')
/* eslint-enable no-unused-vars */

const CategoryEditorStore = t
  .model('CategoryEditorStore', {
    category: t.optional(Category, {}),
    isEdit: t.optional(t.boolean, false),

    // statusBox
    success: t.optional(t.boolean, false),
    error: t.optional(t.boolean, false),
    warn: t.optional(t.boolean, false),
    statusMsg: t.optional(t.string, ''),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get categoryData() {
      return stripMobx(self.category)
    },
  }))
  .actions(self => ({
    updateCategory(sobj) {
      const category = R.merge(self.category, { ...sobj })
      self.markState({ category })
    },
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CategoryEditorStore
