/*
 * CheatSheetPaperStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { markStates, buildLog } from '@utils'
/* eslint-disable no-unused-vars */
const log = buildLog('S:CheatSheetPaperStore')
/* eslint-enable no-unused-vars */

const MarkDownBlock = t.model('Suggestion', {
  header: t.string,
  cards: t.array(t.string),
})

const CheatSheetPaperStore = t
  .model('CheatSheetPaperStore', {
    current: t.optional(t.string, ''),
    source: t.optional(t.array(MarkDownBlock), []),
    errMsg: t.optional(t.string, ''),
    state: t.optional(
      t.enumeration('state', [
        'init',
        'loading',
        'empty',
        'net_error',
        'parse_error',
        '404',
        'loaded',
      ]),
      'init'
    ),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default CheatSheetPaperStore
