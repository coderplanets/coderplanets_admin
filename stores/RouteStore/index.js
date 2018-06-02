/*
 * RouteStore store
 *
 */

import { types as t } from 'mobx-state-tree'
import R from 'ramda'
import Router from 'next/router'

import { markStates, makeDebugger } from '../../utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('S:RouteStore')
/* eslint-enable no-unused-vars */

const Query = t.model('Query', {
  page: t.optional(t.string, '1'),
  size: t.optional(t.string, '20'), // TODO: use config
  // sort .... [when, ...]
  // view ... [chart, list ...]
})

const RouteStore = t
  .model('RouteStore', {
    mainQuery: t.optional(t.string, ''),
    subQuery: t.optional(t.string, ''),
    query: t.optional(Query, {}),
  })
  .views(self => ({
    get curPath() {
      return self.mainQuery
    },
    get curRoute() {
      const { mainQuery, subQuery } = self
      return { mainQuery, subQuery }
    },
  }))
  .actions(self => ({
    markQuery(query = {}) {
      query = R.mapObjIndexed(v => String(v), query)
      const { page } = query

      // page = 1 is default
      if (page && page === '1') {
        query = R.omit(['page', 'size'], query)
      }

      /* debug('final query =>  ', query) */
      if (typeof window !== 'undefined') {
        return Router.push({
          pathname: `/${self.mainQuery}`,
          asPath: `/${self.subQuery}`,
          query,
          shallow: true,
        })
      }
    },

    markState(sobj) {
      markStates(sobj, self)
    },
  }))

export default RouteStore
