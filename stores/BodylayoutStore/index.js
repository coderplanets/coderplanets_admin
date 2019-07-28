/*
 * BodylayoutStore store
 *
 */

import { types as t, getParent } from 'mobx-state-tree'

import { buildLog } from '@utils'
/* eslint-disable no-unused-vars */
const log = buildLog('S:BodylayoutStore')
/* eslint-enable no-unused-vars */

const BodylayoutStore = t.model('BodylayoutStore', {}).views(self => ({
  get root() {
    return getParent(self)
  },

  get sidebarPin() {
    return self.root.sidebar.pin
  },
}))

export default BodylayoutStore
