/*
 * RouteStore store
 *
 */

import { types as t } from 'mobx-state-tree'
import R from 'ramda'
import Router from 'next/router'

import { PAGE_SIZE } from '../../config'
import { onClient, markStates, makeDebugger, serializeQuery } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:RouteStore')
/* eslint-enable no-unused-vars */

const Query = t.model('Query', {
  page: t.optional(t.string, '1'),
  size: t.optional(t.string, String(PAGE_SIZE.COMMON)),
  // sort .... [when, ...]
  // view ... [chart, list ...]
})

const RouteStore = t
  .model('RouteStore', {
    mainPath: t.optional(t.string, ''),
    subPath: t.optional(t.string, ''),
    query: t.optional(Query, {}),
  })
  .views(self => ({
    get curRoute() {
      const { mainPath, subPath } = self
      return { mainPath, subPath }
    },
  }))
  .actions(self => ({
    // /communities/posts ..
    // /communities/jobs ..
    // .....
    // /javascript/posts ..
    // /racket/jobs ..

    markRoute(query) {
      if (!onClient || R.isEmpty(query)) return false
      const { mainPath, subPath, page } = query

      if (mainPath) {
        self.mainPath = mainPath
      }
      if (subPath) {
        self.subPath = subPath
      }

      if (page && String(page) === '1') {
        query = R.omit(['page'], query)
      }

      const allQueryString = serializeQuery(query)
      const queryString = serializeQuery(R.omit(['mainPath', 'subPath'], query))

      const url = `/${allQueryString}`
      let asPath = `/${self.mainPath}/${self.subPath}${queryString}`
      if (self.subPath === 'index' || self.mainPath === self.subPath) {
        asPath = `/${self.mainPath}${queryString}`
      }

      // NOTE: shallow option only works for same page url
      // if page is diffrent, it will cause page reload
      Router.push(url, asPath, {
        shallow: true,
      })
    },
    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default RouteStore
