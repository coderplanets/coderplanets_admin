/*
 * TagEditorStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
import R from 'ramda'

import { Tag, PagedCommunities } from '../SharedModel'
import { markStates, makeDebugger, stripMobx } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:TagEditorStore')
/* eslint-enable no-unused-vars */

const TagEditorStore = t
  .model('TagEditorStore', {
    tag: t.optional(Tag, {}),
    pagedCommunities: t.maybe(PagedCommunities),
    // Creating or Updating mutating: t.optional(t.boolean, false),
    // is Edit or Create
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
    get tagData() {
      return stripMobx(self.tag)
    },
    get pagedCommunitiesData() {
      return stripMobx(self.pagedCommunities)
    },
  }))
  .actions(self => ({
    updateTag(sobj) {
      const tag = R.merge(self.tag, { ...sobj })
      self.markState({ tag })
    },
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default TagEditorStore
