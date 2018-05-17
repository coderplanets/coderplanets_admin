import R from 'ramda'

import { makeDebugger, dispatchEvent, EVENT, isEmptyNil } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:Route')
/* eslint-enable no-unused-vars */

let route = null

const getQueryMain = routeObj => {
  if (R.isEmpty(routeObj)) return ''

  if (isEmptyNil(routeObj.query) && routeObj.pathname !== '/') {
    return routeObj.pathname.slice(1)
  }

  return routeObj.query.main
}

const getQuerySub = q => {
  // TODO isEmpty ..
  return R.last(R.split('/', q.asPath))
}

export function syncRoute(routeObj) {
  /*
     debug('syncRoute routeObj: ', routeObj)
     debug('syncRoute query: ', routeObj.query)
     debug('syncRoute pathname: ', routeObj.pathname)
     debug('syncRoute asPath: ', routeObj.asPath)
     debug('syncRoute route: ', routeObj.route)
     debug('### getQueryMain: ', getQueryMain(routeObj))
   */
  const mainQuery = getQueryMain(routeObj)
  const subQuery = getQuerySub(routeObj)

  route.markState({
    mainQuery,
    subQuery,
  })

  // avoid sr71/apollo default debouce
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
