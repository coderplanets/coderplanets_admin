/*
 * CommunitySetterStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { Community } from '../SharedModel'
import { markStates, makeDebugger, stripMobx } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:CommunitySetterStore')
/* eslint-enable no-unused-vars */

// TODO: move it to sharedModels
const PagedCommunities = t.model('PagedCommunities', {
  entries: t.optional(t.array(Community), []),
  pageNumber: t.optional(t.number, 1),
  pageSize: t.optional(t.number, 20), // TODO: USE CONSTANTS
  totalCount: t.optional(t.number, 0),
  totalPages: t.optional(t.number, 0),
})

const CommunitySetterStore = t
  .model('CommunitySetterStore', {
    pagedCommunities: t.maybe(PagedCommunities),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get pagedCommunitiesData() {
      return stripMobx(self.pagedCommunities)
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CommunitySetterStore
