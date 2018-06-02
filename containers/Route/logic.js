import R from 'ramda'

import { makeDebugger /*  isEmptyNil, getParameterByName */ } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:Route')
/* eslint-enable no-unused-vars */

let route = null

/*
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
 */

const asPathForMain = R.compose(
  R.head,
  R.split('?'),
  R.head,
  R.reject(R.isEmpty),
  R.split('/'),
  R.prop('asPath')
)

const INDEX = ''
const getMainPath = routeObj => {
  if (R.isEmpty(routeObj)) return INDEX
  const { asPath } = routeObj
  if (asPath === '/') return INDEX

  /* const test = splitAsPathTest('/communities/posts/?page=1&size=20') */
  /* console.log('test --> ', test) */

  /* const asPathList = splitAsPath(routeObj) */
  /* console.log('asPathList -- > ', asPathList) */
  return asPathForMain(routeObj)
}

const asPathForSub = R.compose(
  R.reject(R.isEmpty),
  R.split('/'),
  R.head,
  R.reject(R.contains('=')),
  R.reject(R.isEmpty),
  R.split('?'),
  R.prop('asPath')
)

const getSubPath = routeObj => {
  if (R.isEmpty(routeObj)) return INDEX

  const { asPath } = routeObj
  if (asPath === '/') return INDEX

  const asPathList = asPathForSub(routeObj)
  /* console.log('asPath jjj -> ', asPathList) */
  /* const asPathList = asPathForSub('/communities') */

  /* const asPathList = asPathForSub('/communities/posts?page=2&size=20') */
  /* const asPathListtest = asPathForSub('/communities/posts/?page=2&size=20') */
  /* const asPathListtest = fuckmetest('/communities') */
  /* const asPathListtest = fuckmetest('/communities/') */
  /* console.log('asPathListtest jjj -> ', asPathListtest) */

  return asPathList.length > 1 ? asPathList[1] : asPathList[0]
}

export function syncRoute(routeObj) {
  /* const mainQuery = getQueryMain(routeObj) */
  const mainQuery = getMainPath(routeObj)
  /* console.log('mainQuery ## ', mainQuery) */

  const subQuery = getSubPath(routeObj)
  /* const subQuery = getSubPath(routeObj) */
  /* const subPath = getSubPath(routeObj) */
  /* console.log('subPath final -->  ', subPath) */

  const { query } = routeObj

  // TODO: mainQuery -> mainPath
  //       subQuery  -> subPath
  route.markState({
    mainQuery,
    subQuery,
    query,
  })
}

export function init(selectedStore) {
  route = selectedStore
}
