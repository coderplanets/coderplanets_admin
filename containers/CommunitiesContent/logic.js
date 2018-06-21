import R from 'ramda'
import { message } from 'antd'
/* import Router from 'next/router' */

import {
  asyncRes,
  asyncErr,
  $solver,
  ERR,
  makeDebugger,
  EVENT,
  TYPE,
  THREAD,
  scrollIntoEle,
  closePreviewer,
  dispatchEvent,
} from '../../utils'

import { PAGE_SIZE } from '../../config'
import S from './schema'
import SR71 from '../../utils/network/sr71'

let sub$ = null

const sr71$ = new SR71({
  resv_event: [EVENT.LOGOUT, EVENT.LOGIN, EVENT.PREVIEW_CLOSE],
})

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CommunitiesContent')
/* eslint-enable no-unused-vars */

let communitiesContent = null

const commonFilter = page => {
  const size = PAGE_SIZE.COMMON
  return {
    filter: { page, size },
  }
}

export function loadCommunities(page = 1) {
  const size = PAGE_SIZE.COMMON
  const args = {
    filter: { page, size },
  }
  scrollIntoEle(TYPE.APP_HEADER_ID)

  communitiesContent.markState({ communitiesLoading: true })

  communitiesContent.markRoute({ page })
  communitiesContent.markRoute({ page })
  const { route } = communitiesContent

  args.filter = R.merge(args.filter, route.query)
  sr71$.query(S.pagedCommunities, args)
}

export function loadCategories(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)
  /* const size = PAGE_SIZE.COMMON */
  communitiesContent.markRoute({ page })

  communitiesContent.markState({ categoriessLoading: true })
  sr71$.query(S.pagedCategories, commonFilter(page))
}

export function loadTags(page = 1) {
  scrollIntoEle(TYPE.APP_HEADER_ID)

  communitiesContent.markRoute({ page })
  communitiesContent.markState({ tagsLoading: true })

  sr71$.query(S.pagedTags, commonFilter(page))
}

export function loadThreads(page = 1) {
  /* const size = PAGE_SIZE.COMMON */
  scrollIntoEle(TYPE.APP_HEADER_ID)
  communitiesContent.markRoute({ page })
  /*  */
  communitiesContent.markState({ tagsLoading: true })
  sr71$.query(S.pagedThreads, commonFilter(page))
}

export function loadPosts(page = 1) {
  const size = PAGE_SIZE.COMMON
  const args = {
    filter: { page, size },
  }
  scrollIntoEle(TYPE.APP_HEADER_ID)
  communitiesContent.markState({ postsLoading: true })
  sr71$.query(S.pagedPosts, args)
}

export function loadJobs(page = 1) {
  const size = PAGE_SIZE.COMMON
  const args = {
    filter: { page, size },
  }
  scrollIntoEle(TYPE.APP_HEADER_ID)
  communitiesContent.markState({ jobsLoading: true })
  sr71$.query(S.pagedJobs, args)
}

export function loadCommunitiesIfOnClient() {
  if (!communitiesContent.pagedCommunities) {
    debug('loadCommunitiesIfOnClient')
    loadCommunities()
  }
}

export function loadTagsIfOnClient() {
  if (!communitiesContent.pagedTags) {
    debug('loadTagsIfOnClient')
    loadTags()
  }
}

export function loadThreadsIfOnClient() {
  if (!communitiesContent.pagedThreads) {
    debug('loadThreadsIfOnClient')
    loadThreads()
  }
}

export function onEdit(record) {
  debug('unMatched edit: ', record)
}

export function onEditCategory(record) {
  debug('onEditCategory', record)

  dispatchEvent(EVENT.NAV_UPDATE_CATEGORY, {
    type: TYPE.PREVIEW_UPDATE_CATEGORY,
    data: record,
  })
}

export function onEditTag(record) {
  dispatchEvent(EVENT.NAV_UPDATE_TAG, {
    type: TYPE.PREVIEW_UPDATE_TAG,
    data: record,
  })
}

// TODO rename to onDeleteCommunity
export function onDelete(record) {
  sr71$.mutate(S.deleteCommunity, { id: record.id })
}

export function onDeleteTag(record) {
  const args = { id: record.id, communityId: record.community.id }
  sr71$.mutate(S.deleteTag, args)
}

export function setCommunity(thread, source) {
  dispatchEvent(EVENT.NAV_SET_COMMUNITY, {
    type: TYPE.PREVIEW_SET_COMMUNITY,
    data: {
      source,
      thread,
    },
  })
}

let CurThread = THREAD.POST
export function unsetCommunity(thread, source, communityId) {
  const args = {
    thread,
    communityId,
    id: source.id,
  }

  CurThread = thread
  sr71$.mutate(S.unsetCommunity, args)
}

export function unsetThread(communityId, thread) {
  sr71$.mutate(S.unsetThread, {
    threadId: thread.id,
    communityId,
  })
}

export function setThread(source) {
  dispatchEvent(EVENT.NAV_SET_THREAD, {
    type: TYPE.PREVIEW_SET_THREAD,
    data: source,
  })
}

export function unsetCategory(communityId, category) {
  sr71$.mutate(S.unsetCategory, {
    communityId,
    categoryId: category.id,
  })
}

export function setCategory(source) {
  dispatchEvent(EVENT.NAV_SET_CATEGORY, {
    type: TYPE.PREVIEW_SET_CATEGORY,
    data: source,
  })
}

export function setTag(thread, source) {
  dispatchEvent(EVENT.NAV_SET_TAG, {
    type: TYPE.PREVIEW_SET_TAG,
    data: {
      thread,
      source,
    },
  })
}

export function unsetTag(threadId, tag) {
  const args = {
    thread: R.toUpper(tag.thread),
    id: threadId,
    tagId: tag.id,
    communityId: tag.community.id,
  }
  sr71$.mutate(S.unsetTag, args)
}

/* when error occured cancle all the loading state */
const cancleLoading = () => {
  communitiesContent.markState({
    communitiesLoading: false,
    postsLoading: false,
    jobsLoading: false,
    tagsLoading: false,
    categoriessLoading: false,
  })
}

const DataSolver = [
  {
    match: asyncRes('pagedCommunities'),
    action: ({ pagedCommunities }) => {
      cancleLoading()
      debug(
        '## loadCommunities in the client .... pagedCommunities: ',
        pagedCommunities.pageNumber
      )

      communitiesContent.markState({
        pagedCommunities,
      })
    },
  },
  {
    match: asyncRes('pagedTags'),
    action: ({ pagedTags }) => {
      cancleLoading()
      communitiesContent.markState({
        pagedTags,
      })
    },
  },
  {
    match: asyncRes('pagedThreads'),
    action: ({ pagedThreads }) => {
      cancleLoading()
      communitiesContent.markState({
        pagedThreads,
      })
    },
  },
  {
    match: asyncRes('pagedPosts'),
    action: ({ pagedPosts }) => {
      cancleLoading()
      communitiesContent.markState({
        pagedPosts,
      })
    },
  },
  {
    match: asyncRes('pagedJobs'),
    action: ({ pagedJobs }) => {
      cancleLoading()
      communitiesContent.markState({
        pagedJobs,
      })
    },
  },
  {
    match: asyncRes('pagedCategories'),
    action: ({ pagedCategories }) => {
      cancleLoading()
      communitiesContent.markState({
        pagedCategories,
      })
    },
  },
  {
    match: asyncRes('deleteCommunity'),
    action: () => closePreviewer(TYPE.COMMUNITIES_REFRESH),
  },
  {
    match: asyncRes('unsetCommunity'),
    action: () => {
      switch (CurThread) {
        case THREAD.JOB: {
          const { pageNumber } = communitiesContent.pagedJobsData
          return loadJobs(pageNumber)
        }
        default: {
          const { pageNumber } = communitiesContent.pagedPostsData
          return loadPosts(pageNumber)
        }
      }
    },
  },
  {
    match: asyncRes('unsetCategory'),
    action: () => loadCommunities(),
  },
  {
    match: asyncRes('unsetThread'),
    action: () => loadCommunities(),
  },
  {
    match: asyncRes('unsetTag'),
    action: () => loadPosts(),
  },
  {
    match: asyncRes('deleteTag'),
    action: () => loadTags(),
  },
  {
    match: asyncRes(EVENT.LOGOUT),
    action: () => loadCommunities(),
  },
  {
    match: asyncRes(EVENT.LOGIN),
    action: () => loadCommunities(),
  },
  {
    match: asyncRes(EVENT.PREVIEW_CLOSE),
    action: res => {
      const closeType = res[EVENT.PREVIEW_CLOSE].type
      debug('PREVIEW_CLOSE --> ', closeType)
      switch (closeType) {
        case TYPE.COMMUNITIES_REFRESH: {
          const { pageNumber } = communitiesContent.pagedCommunitiesData
          return loadCommunities(pageNumber)
        }
        case TYPE.TAGS_REFRESH: {
          const { pageNumber } = communitiesContent.pagedTagsData
          return loadTags(pageNumber)
        }
        case TYPE.GATEGORIES_REFRESH: {
          const { pageNumber } = communitiesContent.pagedCategoriesData
          return loadCategories(pageNumber)
        }
        case TYPE.POSTS_CONTENT_REFRESH: {
          const { pageNumber } = communitiesContent.pagedPostsData
          return loadPosts(pageNumber)
        }
        case TYPE.JOBS_CONTENT_REFRESH: {
          const { pageNumber } = communitiesContent.pagedJobsData
          return loadJobs(pageNumber)
        }
        default: {
          debug('unknow event: ', closeType)
          /* return loadPosts() */
        }
      }
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.CRAPHQL),
    action: ({ details }) => {
      debug('ERR.CRAPHQL -->', details[0].detail)
      message.error(details[0].detail)
      cancleLoading()
    },
  },
  {
    match: asyncErr(ERR.TIMEOUT),
    action: ({ details }) => {
      debug('ERR.TIMEOUT -->', details)
      cancleLoading()
    },
  },
  {
    match: asyncErr(ERR.NETWORK),
    action: ({ details }) => {
      debug('ERR.NETWORK -->', details)
      cancleLoading()
    },
  },
]

export function init(selectedStore) {
  if (communitiesContent) return false
  communitiesContent = selectedStore

  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
