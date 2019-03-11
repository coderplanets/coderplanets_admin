/*
 * AccountStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
import R from 'ramda'

import { markStates, makeDebugger, stripMobx, BStore } from 'utils'
import { User, EmptyUser } from '../SharedModel'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:AccountStore')
/* eslint-enable no-unused-vars */

const AccountStore = t
  .model('AccountStore', {
    user: t.optional(User, {}),
    // subscribedCommunites: ...
  })
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get accountInfo() {
      return {
        ...stripMobx(self.user),
      }
    },

    get subscribedCommunities() {
      const {
        user: { subscribedCommunities },
      } = self
      return {
        ...stripMobx(subscribedCommunities),
      }
    },
    get isLogin() {
      return self.user.nickname !== ''
    },
  }))
  .actions(self => ({
    logout() {
      self.root.preview.close()
      self.sessionCleanup()
    },
    isMemberOf(type) {
      const { achievement } = stripMobx(self.user)
      if (!achievement) return false
      return achievement[type] || false
    },
    updateAccount(sobj) {
      const user = R.merge(stripMobx(self.user), { ...sobj })

      self.markState({ user })
    },
    updateSesstion({ isValid, user }) {
      self.isValidSession = isValid
      if (isValid) {
        self.setSession(user, BStore.get('token'))
        return self.updateAccount(user || {})
      }
      return self.sessionCleanup()
    },
    setSession(user, token) {
      // debug('setSession user: ', user)
      // debug('setSession token: ', token)

      BStore.set('user', user)
      BStore.set('token', token)
      BStore.cookie.set('jwtToken', token)
    },
    sessionCleanup() {
      self.user = EmptyUser
      self.isValidSession = false
      BStore.remove('user')
      BStore.remove('token')
      BStore.cookie.remove('jwtToken')
    },
    loadSubscribedCommunities(data) {
      self.user.subscribedCommunities = data
    },

    addSubscribedCommunity(community) {
      const {
        user: {
          subscribedCommunities: { entries },
        },
      } = self

      self.user.subscribedCommunities.entries = R.insert(0, community, entries)
      self.user.subscribedCommunities.totalCount += 1

      self.root.communities.toggleSubscribe(community)
    },

    removeSubscribedCommunity(community) {
      const {
        user: {
          subscribedCommunities: { entries },
        },
      } = self

      const index = R.findIndex(R.propEq('id', community.id), entries)
      self.user.subscribedCommunities.entries = R.remove(index, 1, entries)
      self.user.subscribedCommunities.totalCount -= 1
      self.root.communities.toggleSubscribe(community)
    },

    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default AccountStore
