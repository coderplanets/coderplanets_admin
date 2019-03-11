import R from 'ramda'

import {
  TYPE,
  asyncRes,
  makeDebugger,
  $solver,
  cast,
  closePreviewer,
  updateEditing,
} from 'utils'
import SR71 from 'utils/network/sr71'

import { PAGE_SIZE } from 'config'

import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:TagEditor')
/* eslint-enable no-unused-vars */

let store = null

const commonFilter = page => {
  const size = PAGE_SIZE.M
  return {
    filter: { page, size },
  }
}

export function getAllCommunities(page = 1) {
  sr71$.query(S.pagedCommunities, commonFilter(page))
}

export const mutateConfirm = () => {
  const requiredArgs = [
    'id',
    'title',
    'color',
    'thread',
    'topicValue',
    'community',
  ]
  const args = { ...store.tagData }

  store.markState({ mutating: true })
  const fargs = cast(requiredArgs, args)

  fargs.color = R.toUpper(fargs.color)
  fargs.communityId = fargs.community.id

  if (store.isEdit) {
    return sr71$.mutate(S.updateTag, fargs)
  }

  fargs.topic = fargs.topicValue
  fargs.thread = R.toUpper(fargs.thread)
  console.log('fargs --> ', fargs)

  return sr71$.mutate(S.createTag, fargs)
}

const initEditData = editData => {
  store.markState({
    tag: editData,
    topicValue: editData.topic.title,
    isEdit: true,
  })
}

export function cancleMutate() {
  store.markState({
    tag: {},
    isEdit: false,
  })
  closePreviewer()
}

export const inputOnChange = (part, e) => updateEditing(store, part, e)

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: asyncRes('createTag'),
    action: () => closePreviewer(TYPE.TAGS_REFRESH),
  },
  {
    match: asyncRes('updateTag'),
    action: () => closePreviewer(TYPE.TAGS_REFRESH),
  },
  {
    match: asyncRes('pagedCommunities'),
    action: ({ pagedCommunities }) => store.markState({ pagedCommunities }),
  },
]

const ErrSolver = []

export function init(selectedStore, editData) {
  store = selectedStore
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  if (editData) {
    initEditData(editData)
  }

  getAllCommunities()
}

export function uninit() {
  cancleMutate()
}
