/*
 * CategorySetterStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'
import { PagedCategories } from '@model'

import { markStates, buildLog, stripMobx } from '@utils'
/* eslint-disable no-unused-vars */
const log = buildLog('S:CategorySetterStore')
/* eslint-enable no-unused-vars */

const CategorySetterStore = t
  .model('CategorySetterStore', {
    pagedCategories: t.maybeNull(PagedCategories),
    Loading: t.optional(t.boolean, false),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get pagedCategoriesData() {
      return stripMobx(self.pagedCategories)
    },
  }))
  .actions(self => ({
    mark(sobj) {
      markStates(sobj, self)
    },
  }))

export default CategorySetterStore
