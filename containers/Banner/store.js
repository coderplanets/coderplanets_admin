/*
 * BannerStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'
// import R from 'ramda'

import { markStates, buildLog } from '@utils'
/* eslint-disable no-unused-vars */
const debug = buildLog('S:BannerStore')
/* eslint-enable no-unused-vars */

const BannerStore = t
  .model('BannerStore', {})
  .views(self => ({
    get root() {
      return getParent(self)
    },
    get curRoute() {
      return self.root.curRoute
    },
  }))
  .actions(self => ({
    markState(sobj) {
      markStates(sobj, self)
    },
    loadCurCommunity(data) {
      self.root.curCommunity.load(data)
    },
  }))

export default BannerStore
