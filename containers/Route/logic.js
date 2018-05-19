import R from 'ramda'

import { makeDebugger, dispatchEvent, EVENT, isEmptyNil } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:Route')
/* eslint-enable no-unused-vars */

let route = null

const getAsPathList = R.compose(
  R.reject(R.isEmpty),
  R.split('/'),
  R.prop('asPath')
)

const getQueryMain = routeObj => {
  if (R.isEmpty(routeObj)) return ''

  if (isEmptyNil(routeObj.query) && routeObj.pathname !== '/') {
    return routeObj.pathname.slice(1)
  } else if (isEmptyNil(routeObj.query) && routeObj.pathname === '/') {
    const asPathList = getAsPathList(routeObj)
    return R.head(asPathList)
  }

  return routeObj.query.main
}

const getQuerySub = routeObj => {
  const asPathList = getAsPathList(routeObj)
  return R.last(asPathList)
}

export function syncRoute(routeObj) {
  /* console.log('syncRoute routeObj: ', routeObj) */
  /*
     console.log('syncRoute query: ', routeObj.query)
     console.log('syncRoute pathname: ', routeObj.pathname)
     console.log('syncRoute asPath: ', routeObj.asPath)
     console.log('syncRoute route: ', routeObj.route)

     console.log(' ----------  ')
     console.log('### getQueryMain: ', getQueryMain(routeObj))
     console.log('### getQuerySub: ', getQuerySub(routeObj))
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
