// import R from 'ramda'

import {
  buildLog,
  getMainPath,
  getSubPath,
  onClient,
  Global,
  // queryStringToJSON /*  isEmptyNil, getParameterByName */,
} from '@utils'

/* eslint-disable no-unused-vars */
const log = buildLog('L:Route')
/* eslint-enable no-unused-vars */
let store = null

export function routeChange() {
  if (onClient) {
    const browserMainPath = getMainPath({ asPath: Global.location.pathname })
    const browserSubPath = getSubPath({ asPath: Global.location.pathname })

    /*
       log('browserMainPath -> ', browserMainPath)
       log('browserSubPath -> ', browserSubPath)

       log('store.mainPath: ', store.mainPath)
       log('store.subPath: ', store.subPath)
     */

    const pathChange =
      store.mainPath !== browserMainPath || store.subPath !== browserSubPath

    if (pathChange) {
      store.markState({ mainPath: browserMainPath, subPath: browserSubPath })
    }
  }
}

export function init(_store, routeObj) {
  if (store) return false
  store = _store

  // sync init router info
  const mainPath = getMainPath(routeObj)
  const subPath = getSubPath(routeObj)
  const { query } = routeObj

  store.markState({ mainPath, subPath, query })
}
