/*
 * CommunityEditorStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
import R from 'ramda'

import { Community } from 'stores/SharedModel'
import { markStates, buildLog, stripMobx } from '@utils'

/* eslint-disable no-unused-vars */
const log = buildLog('S:CommunityEditorStore')
/* eslint-enable no-unused-vars */

const CommunityEditorStore = t
  .model('CommunityEditorStore', {
    community: t.optional(Community, {}),
    // Creating or Updating
    mutating: t.optional(t.boolean, false),
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
    get communityData() {
      return stripMobx(self.community)
    },
  }))
  .actions(self => ({
    updateCommunity(sobj) {
      const community = R.merge(self.community, { ...sobj })
      self.markState({ community })
    },
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CommunityEditorStore
