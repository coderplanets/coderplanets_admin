import R from 'ramda'

import {
  TYPE,
  asyncRes,
  makeDebugger,
  $solver,
  castArgs,
  closePreviewer,
} from '../../utils'
import SR71 from '../../utils/network/sr71'

import { PAGE_SIZE } from '../../config'

import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:TagEditor')
/* eslint-enable no-unused-vars */

let tagEditor = null

const commonFilter = page => {
  const size = PAGE_SIZE.COMMON + 10
  return {
    filter: { page, size },
  }
}

export function getAllCommunities(page = 1) {
  sr71$.query(S.pagedCommunities, commonFilter(page))
}

export const profileChange = R.curry((thread, e) =>
  tagEditor.updateTag({
    [thread]: e.target.value,
  })
)

export const colorChange = color =>
  tagEditor.updateTag({
    color,
  })

export const threadChange = thread =>
  tagEditor.updateTag({
    thread,
  })

export const communityChange = community => {
  console.log('communityChange community: ', community)
  tagEditor.updateTag({
    community,
  })
}

export const mutateConfirm = () => {
  const requiredArgs = ['title', 'color', 'thread', 'community']
  const args = { ...tagEditor.tagData }

  tagEditor.markState({
    mutating: true,
  })
  const fargs = castArgs(args, requiredArgs)

  fargs.color = R.toUpper(fargs.color)
  fargs.thread = R.toUpper(fargs.thread)

  fargs.communityId = fargs.community.id
  debug('fargs --> ', fargs)
  sr71$.mutate(S.createTag, fargs)
}

export function cancleMutate() {
  tagEditor.markState({
    tag: {},
    isEdit: false,
  })
  closePreviewer()
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('createTag'),
    action: () => {
      debug('createTag done!')
      closePreviewer(TYPE.TAGS_REFRESH)
    },
  },
  {
    match: asyncRes('pagedCommunities'),
    action: ({ pagedCommunities }) => {
      tagEditor.markState({
        pagedCommunities,
      })
    },
  },
]

const ErrSolver = []

export function init(selectedStore) {
  tagEditor = selectedStore
  debug(tagEditor)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  getAllCommunities()
}
