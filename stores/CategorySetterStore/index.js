/*
 * CategorySetterStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'
import { Category } from '../SharedModel'

import { markStates, makeDebugger, stripMobx } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:CategorySetterStore')
/* eslint-enable no-unused-vars */

const PagedCategories = t.model('PagedCategories', {
  entries: t.optional(t.array(Category), []),
  pageNumber: t.optional(t.number, 1),
  pageSize: t.optional(t.number, 20), // TODO: USE CONSTANTS
  totalCount: t.optional(t.number, 0),
  totalPages: t.optional(t.number, 0),
})

const CategorySetterStore = t
  .model('CategorySetterStore', {
    pagedCategories: t.maybe(PagedCategories),
    Loading: t.optional(t.boolean, false),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get pagedCategoriesDate() {
      return stripMobx(self.pagedCategories)
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CategorySetterStore
