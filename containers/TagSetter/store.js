/*
 * TagSetterStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { Tag } from '../../stores/SharedModel'
import { markStates, makeDebugger, stripMobx } from '../../utils'
/* import { CMS_THREADS } from '../../config' */

/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:TagSetterStore')
/* eslint-enable no-unused-vars */

const TagSetterStore = t
  .model('TagSetterStore', {
    tags: t.optional(t.array(Tag), []),
    loading: t.optional(t.boolean, false),
    activeCommunityRaw: t.optional(t.string, ''),
    activeThread: t.optional(t.string, 'POST'), // t.optional(t.enumeration('thread', CMS_THREADS), CMS_THREADS[0]),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get tagsData() {
      return stripMobx(self.tags)
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default TagSetterStore
