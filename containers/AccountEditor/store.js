/*
 * AccountEditorStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
import R from 'ramda'

import { User } from '@model'
import { markStates, buildLog, stripMobx } from '@utils'

/* eslint-disable no-unused-vars */
const log = buildLog('S:AccountEditorStore')
/* eslint-enable no-unused-vars */

const AccountEditorStore = t
  .model('AccountEditorStore', {
    user: t.optional(User, {}),
    updating: t.optional(t.boolean, false),
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
    get accountInfo() {
      return {
        ...stripMobx(self.user),
      }
    },
    get accountOrigin() {
      return self.root.account.accountInfo
    },
  }))
  .actions(self => ({
    copyAccountInfo() {
      const { accountInfo } = self.root.account
      if (accountInfo !== {}) {
        self.user = accountInfo
      }
    },

    updateOrign(user) {
      self.root.account.updateAccount(user)
    },

    updateUser(sobj) {
      const user = R.merge(self.user, { ...sobj })
      self.mark({ user })
    },

    mark(sobj) {
      markStates(sobj, self)
    },
  }))

export default AccountEditorStore
