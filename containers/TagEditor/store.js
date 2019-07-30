/*
 * TagEditorStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
import R from 'ramda'

import { Tag, PagedCommunities } from '@model'
import { markStates, buildLog, stripMobx } from '@utils'
/* eslint-disable no-unused-vars */
const log = buildLog('S:TagEditorStore')
/* eslint-enable no-unused-vars */

const TagEditorStore = t
  .model('TagEditorStore', {
    tag: t.optional(Tag, {}),
    pagedCommunities: t.maybeNull(PagedCommunities),
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
    updateEditing(sobj) {
      const tag = R.merge(self.tag, { ...sobj })
      self.markState({ tag })
    },
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default TagEditorStore
