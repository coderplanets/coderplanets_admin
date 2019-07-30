/*
 * constants used cross the site
 */

export { default as asyncSuit } from './async_suit'

export { buildLog } from './logger'
export { default as uid } from './uid'
/*
 * utils functiosn
 */

export {
  send,
  mapKeys,
  mapKey,
  mapValue,
  maybe,
  objToArray,
  toPercentNum,
  Global,
  onClient,
  cutFrom,
  prettyNum,
  sortByColor,
  sortByIndex,
  Rlog,
  countWords,
  debounce,
  closePreviewer,
  extractMentions,
  extractAttachments,
} from './functions'

export {
  cast,
  changeset,
  notEmpty,
  hasValue,
  isEmptyValue,
  nilOrEmpty,
  isObject,
  isEmptyNil,
} from './validator'

export {
  makeGQClient,
  makeGithubExplore,
  asyncErr,
  asyncRes,
  later,
  pagedFilter,
} from './graphql_helper'

export {
  getMainPath,
  getSubPath,
  getParameterByName,
  getQueryFromUrl,
  queryStringToJSON,
  mergeRouteQuery,
  serializeQuery,
  getDomain,
  extractThreadFromPath,
  subPath2Thread,
  thread2Subpath,
} from './route_helper'

export {
  connectStore,
  storePlug,
  markStates,
  meteorState,
  stripMobx,
  $solver,
  observerHoc,
  updateEditing,
} from './mobx_helper'

export { pageGoTop, scrollIntoEle, holdPage, unholdPage } from './dom_operator'

/*
 * theme related
 */
export {
  theme,
  themeMeta,
  themeSkins,
  themeCoverMap,
  themeCoverIndexMap,
} from './themes'

export { default as fakeUsers } from './fake_user'
export { default as SOCIAL_LISTS } from './social_lists'

export {
  ssrPagedSchema,
  ssrPagedContents,
  ssrCommunityFilter,
} from './ssr_helper'

// helpers
export { default as cs } from './common_styles'
export { default as animate } from './animations'
export { default as BStore } from './bstore'
export { default as GA } from './analytics'
export { Trans } from './i18n'
