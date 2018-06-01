/*
 * PermissionEditorStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { PagedCommunities } from '../SharedModel'

import { markStates, makeDebugger, stripMobx } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:PermissionEditorStore')
/* eslint-enable no-unused-vars */

const CmsRules = t.model('CmsRules', {
  general: t.string,
  community: t.string,
})

const AllRules = t.model('AllRules', {
  cms: t.optional(CmsRules, { general: '', community: '' }),
})

const PermissionEditorStore = t
  .model('PermissionEditorStore', {
    pagedCommunities: t.maybe(PagedCommunities),
    allRules: t.optional(AllRules, {}),
    curView: t.optional(
      t.enumeration('curView', ['general', 'community']),
      'general'
    ),
    curCommunityRaw: t.optional(t.string, 'general'),
    selectRules: t.optional(t.string, '{}'),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get pagedCommunitiesData() {
      return stripMobx(self.pagedCommunities)
    },
    get allRulesData() {
      return stripMobx(self.allRules)
    },
    get selectRulesData() {
      return JSON.parse(self.selectRules)
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default PermissionEditorStore
