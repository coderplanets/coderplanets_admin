/*
 * TypeWriterStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { markStates, buildLog, stripMobx } from '@utils'
/* eslint-disable no-unused-vars */
const log = buildLog('S:TypeWriterStore')
/* eslint-enable no-unused-vars */

const TypeWriterStore = t
  .model('TypeWriterStore', {
    title: t.optional(t.string, ''),
    linkAddr: t.optional(t.string, ''),
    body: t.optional(t.string, ''),
    publishing: t.optional(t.boolean, false),

    isOriginal: t.optional(t.boolean, true),

    cpType: t.optional(
      t.enumeration('cpType', ['original', 'reprint', 'translate']),
      'original'
    ),
    curView: t.optional(
      t.enumeration('curView', [
        'MARKDOWN_HELP_VIEW',
        'EDIT_VIEW',
        'CREATE_VIEW',
        'PREVIEW_VIEW',
      ]),
      'CREATE_VIEW'
    ),

    isEdit: t.optional(t.boolean, false),
    /* for StatusBox */
    success: t.optional(t.boolean, false),
    error: t.optional(t.boolean, false),
    warn: t.optional(t.boolean, false),
    statusMsg: t.optional(t.string, ''),
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get statusClean() {
      const { success, error, warn } = self
      return !success && !error && !warn
    },
    get viewing() {
      return stripMobx(self.root.viewing)
    },
    get thread() {
      return self.root.viewing.activeThread
    },
  }))
  .actions(self => ({
    toast(type, options) {
      self.root.toast(type, options)
    },
    closePreview() {
      self.root.closePreview()
    },
    reset() {
      self.mark({
        title: '',
        linkAddr: '',
        body: '',
        isOriginal: true,
        cpType: 'original',
        isEdit: false,
        // curView:
      })
    },
    mark(sobj) {
      markStates(sobj, self)
    },
  }))

export default TypeWriterStore
