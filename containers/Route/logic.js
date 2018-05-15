import R from 'ramda'

import { makeDebugger, dispatchEvent, EVENT } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:Route')
/* eslint-enable no-unused-vars */

let route = null

// const getMainQuery = q => (R.isEmpty(q) ? '' : q.main)
// const getSubQuery = q => (R.isEmpty(q) || !R.has('sub', q) ? 'index' : q.sub)

const getQueryMain = q => {
  if (R.isEmpty(q)) return ''
  if (!q.main && q.pathname !== '/') {
    return q.pathname.slice(1)
  }

  return q.main
}

const getQuerySub = q => {
  // TODO isEmpty ..
  return R.last(R.split('/', q.asPath))
}

export function syncRoute(current) {
  // const { query } = current

  /*
     debug('syncRoute current: ', current)
     debug('syncRoute query: ', current.query)
     debug('syncRoute pathname: ', current.pathname)
     debug('syncRoute asPath: ', current.asPath)
     debug('syncRoute route: ', current.route)
     debug('getQueryMain: ', getQueryMain(current))
   */

  /* const mainQuery = query ? getMainQuery(query) : '' */
  const mainQuery = getQueryMain(current)
  const subQuery = getQuerySub(current)

  /*
     debug('mainQuery: ', mainQuery)
     debug('subQuery: ', subQuery)
   */

  route.markState({
    mainQuery,
    subQuery,
  })

  // avoid sr71 default debouce
  setTimeout(() => {
    dispatchEvent(EVENT.ROUTE_CHANGE, {
      mainQuery,
      subQuery,
    })
  }, 500)
}

export function init(selectedStore) {
  route = selectedStore
}
