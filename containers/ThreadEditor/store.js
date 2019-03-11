/*
 * ThreadEditor store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
import R from 'ramda'

import { Thread } from 'stores/SharedModel'

import { markStates, makeDebugger, stripMobx } from 'utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:ThreadEditor')
/* eslint-enable no-unused-vars */

const ThreadEditor = t
  .model('ThreadEditor', {
    editThread: t.optional(Thread, {}),

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
    get editThreadData() {
      return stripMobx(self.editThread)
    },
  }))
  .actions(self => ({
    updateEditing(sobj) {
      const editThread = R.merge(self.editThread, { ...sobj })
      self.markState({ editThread })
    },
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default ThreadEditor
