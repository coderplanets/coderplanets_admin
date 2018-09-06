/*
 * constants used cross the site
 */

export { EVENT, ERR, TYPE, ROUTE, THREAD } from './constants'

export { makeDebugger } from './debug'
export { default as uid } from './uid'
/*
 * utils functiosn
 */
export {
  dispatchEvent,
  mapKeys,
  mapKey,
  mapValue,
  isObject,
  maybe,
  objToArray,
  notEmpty,
  isEmptyNil,
  isEmptyValue,
  toPercentNum,
  Global,
  onClient,
  cutFrom,
  prettyNum,
  Rlog,
  countWords,
  debounce,
  castArgs,
  closePreviewer,
  extractMentions,
  extractAttachments,
} from './functions'

export { asyncErr, asyncRes } from './graphql_helper'
export {
  getMainPath,
  getSubPath,
  getParameterByName,
  queryStringToJSON,
  mergeRouteQuery,
  serializeQuery,
} from './route_helper'

export {
  storePlug,
  markStates,
  meteorState,
  stripMobx,
  $solver,
  observerHoc,
} from './mobx_helper'

export {
  pageGoTop,
  scrollIntoEle,
  holdPage,
  unholdPage,
  focusDoraemonBar,
  hideDoraemonBarRecover,
} from './dom_operator'

export { default as Animate } from './animations'
export { smokey, column, columnCenter } from './common_styles'
/*
 * theme related
 */
export {
  theme,
  themeDict,
  themeKeys,
  themeColorMap,
  selectorColors,
} from './themes'

export { default as fakeUsers } from './fake_user'

export { default as GA } from './analytics'
export { Trans } from './i18n'
