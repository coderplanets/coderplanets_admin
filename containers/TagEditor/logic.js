import R from 'ramda'

import { PAGE_SIZE } from '@config'
import {
  asyncSuit,
  TYPE,
  buildLog,
  cast,
  closePreviewer,
  updateEditing,
} from '@utils'

import S from './schema'

/* eslint-disable no-unused-vars */
const log = buildLog('L:TagEditor')
/* eslint-enable no-unused-vars */

const { SR71, asyncRes, $solver } = asyncSuit
const sr71$ = new SR71()

let sub$ = null
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
