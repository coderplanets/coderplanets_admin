export const ERR = {
  CRAPHQL: 'CRAPHQL',
  PARSE_CHEATSHEET_MD: 'PARSE_CHEATSHEET_MD',
  NETWORK: 'NETWORK',
  NOT_FOUND: 'NOT_FOUND',
  TIMEOUT: 'TIMEOUT',
}

export const EVENT = {
  LOGIN_PANEL: 'LOGIN_PANEL',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  ROUTE_CHANGE: 'ROUTE_CHANGE',
  PREVIEW: 'PREVIEW',
  PREVIEW_CLOSE: 'PREVIEW_CLOSE',
  PREVIEW_CLOSED: 'PREVIEW_CLOSED',
  PREVIEW_POST: 'PREVIEW_POST',
  NAV_EDIT: 'NAV_EDIT',
  NAV_CREATE_POST: 'NAV_CREATE_POST',
  REFRESH_POSTS: 'REFRESH_POSTS',

  // menu
  SIDEBAR_MENU_CHANGE: 'SIDEBAR_MENU_CHANGE',
  // ROUTE_COMMUNITY_MENU_CHANGE: 'ROUTE_COMMUNITY_MENU_CHANGE',

  // admin
  NAV_CREATE_COMMUNITY: 'NAV_CREATE_COMMUNITY',
  NAV_UPDATE_COMMUNITY: 'NAV_UPDATE_COMMUNITY',

  // community
  NAV_SET_COMMUNITY: 'NAV_SET_COMMUNITY',

  // category
  NAV_CREATE_CATEGORY: 'NAV_CREATE_CATEGORY',
  NAV_UPDATE_CATEGORY: 'NAV_UPDATE_CATEGORY',
  NAV_SET_CATEGORY: 'NAV_SET_CATEGORY',
  // thread
  NAV_CREATE_THREAD: 'NAV_CREATE_THREAD',
  NAV_SET_THREAD: 'NAV_SET_THREAD',
  // tag
  NAV_SET_TAG: 'NAV_SET_TAG',
  NAV_CREATE_TAG: 'NAV_CREATE_TAG',
  NAV_UPDATE_TAG: 'NAV_UPDATE_TAG',
  // permission
  NAV_CREATE_PERMISSION: 'NAV_CREATE_PERMISSION',
  NAV_UPDATE_PERMISSION: 'NAV_UPDATE_PERMISSION',

  DRAFT_INSERT_SNIPPET: 'DRAFT_INSERT_SNIPPET',
}

export const TYPE = {
  APP_HEADER_ID: 'APP_HEADER_ID',

  CHEATSHEET_ROOT_PAGE: 'CHEATSHEET_ROOT_PAGE',
  COMMUNITIES_ROOT_PAGE: 'COMMUNITIES_ROOT_PAGE',
  COMMUNITY_PAGE: 'COMMUNITY_PAGE',
  POST_PAGE: 'POST_PAGE',
  ACTIVITIES_ROOT_PAGE: 'ACTIVITIES_ROOT_PAGE',

  POST: 'POST',
  JOB: 'JOB',
  FAVORITE: 'FAVORITE',
  STAR: 'STAR',
  WATCH: 'WATCH',
  REACTION: 'reaction',
  UNDO_REACTION: 'undoReaction',
  POST_PREVIEW_VIEW: 'POST_PREVIEW_VIEW',
  PREVIEW_ACCOUNT_VIEW: 'PREVIEW_ACCOUNT_VIEW',
  PREVIEW_ACCOUNT_EDIT: 'PREVIEW_ACCOUNT_EDIT',
  PREVIEW_ROOT_STORE: 'PREVIEW_ROOT_STORE',
  PREVIEW_CREATE_POST: 'PREVIEW_CREATE_POST',

  // admin
  PREVIEW_CREATE_COMMUNITY: 'PREVIEW_CREATE_COMMUNITY',
  PREVIEW_UPDATE_COMMUNITY: 'PREVIEW_UPDATE_COMMUNITY',
  // >> community
  PREVIEW_SET_COMMUNITY: 'PREVIEW_SET_COMMUNITY',
  // >> tags
  PREVIEW_SET_TAG: 'PREVIEW_SET_TAG',
  PREVIEW_CREATE_TAG: 'PREVIEW_CREATE_TAG',
  PREVIEW_UPDATE_TAG: 'PREVIEW_UPDATE_TAG',
  // >> categories
  PREVIEW_CREATE_CATEGORY: 'PREVIEW_CREATE_CATEGORY',
  PREVIEW_UPDATE_CATEGORY: 'PREVIEW_UPDATE_CATEGORY',
  PREVIEW_SET_CATEGORY: 'PREVIEW_SET_CATEGORY',
  // >> threads
  PREVIEW_CREATE_THREAD: 'PREVIEW_CREATE_THREAD',
  PREVIEW_SET_THREAD: 'PREVIEW_SET_THREAD',
  // >> permission
  PREVIEW_CREATE_PERMISSION: 'PREVIEW_CREATE_PERMISSION',
  PREVIEW_UPDATE_PERMISSION: 'PREVIEW_UPDATE_PERMISSION',

  // PAGE STATE
  LOADING: 'LOADING',
  NOT_FOUND: 'NOT_FOUND',
  RESULT: 'RESULT',
  // filters
  ASC_INSERTED: 'ASC_INSERTED',
  DESC_INSERTED: 'DESC_INSERTED',
  MOST_LIKES: 'MOST_LIKES',
  MOST_DISLIKES: 'MOST_DISLIKES',

  // ACTION EVENTS
  POSTS_REFRESH: 'POSTS_REFRESH',
  POSTS_CONTENT_REFRESH: 'POSTS_CONTENT_REFRESH',
  JOBS_CONTENT_REFRESH: 'JOBS_CONTENT_REFRESH',
  COMMUNITIES_REFRESH: 'COMMUNITIES_REFRESH',
  TAGS_REFRESH: 'TAGS_REFRESH',
  GATEGORIES_REFRESH: 'GATEGORIES_REFRESH',

  USERS_REFRESH: 'USERS_REFRESH',
}

export const COMMUNITY_SPEC_THREADS = {
  USER: 'user',
  JOB: 'job',
  VIDEO: 'video',
  REPO: 'repo',
  WIKI: 'wiki',
  CHEATSHEET: 'cheatsheet',
}

export const THREAD = {
  ...COMMUNITY_SPEC_THREADS,
  POST: 'post',
  // home spec
  TECH: 'tech',
  SHARE: 'share',
  RADAR: 'radar',
  CITY: 'city',
  // city spec
  GROUP: 'group',
  COMPANY: 'company',
}

export const ROUTE = {
  // NOTE: use lower case for god sake
  // the fake id for all communities, this item do not has a id, so make a fake one
  // id is used for UI when item is active
  // communities CURD
  COMMUNITIES: 'communities',
  // communities categories CURD
  CATEGORIES: 'categories',
  TAGS: 'tags',
  THREADS: 'threads',

  COMMUNITY: 'community',

  USERS_RAW: 'users',
  USERS: 'users',
  // valid part
  POSTS: 'posts',
  JOBS: 'jobs',
  ACTIVITIES: 'activities',
  CHEATSHEETS: 'cheatsheets',
  EDITORS: 'editors',
  SUBSCRIBERS: 'subscribers',

  // users
  // register users
  REGISTERS: 'registers',
  // mother and fathers
  PAYS: 'pays',
  // users passport CURD
  PASSPORTS: 'passports',
  // roles CURD (based on passports)
  ROLES: 'roles',
}

/* some svg icon are sensitive to fill color */
/* some community svg need fill color, like city etc.. */
export const NON_FILL_COMMUNITY = ['javascript']
