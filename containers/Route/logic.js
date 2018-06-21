import {
  makeDebugger,
  getMainPath,
  getSubPath,
  // queryStringToJSON /*  isEmptyNil, getParameterByName */,
} from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:Route')
/* eslint-enable no-unused-vars */

let route = null

export function syncRoute(routeObj) {
  const mainPath = getMainPath(routeObj)
  const subPath = getSubPath(routeObj)

  const { query } = routeObj

  route.markState({
    mainPath,
    subPath,
    query,
  })
}

export function init(selectedStore) {
  route = selectedStore
}
