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

import S from './schema'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:TagEditor')
/* eslint-enable no-unused-vars */

let tagEditor = null

export const profileChange = R.curry((part, e) =>
  tagEditor.updateTag({
    [part]: e.target.value,
  })
)

export const colorChange = color =>
  tagEditor.updateTag({
    color,
  })

export const partChange = part =>
  tagEditor.updateTag({
    part,
  })

export const mutateConfirm = () => {
  const requiredArgs = ['title', 'color', 'part']
  const args = { ...tagEditor.tagData }

  tagEditor.markState({
    mutating: true,
  })
  const fargs = castArgs(args, requiredArgs)

  fargs.color = R.toUpper(fargs.color)
  fargs.part = R.toUpper(fargs.part)

  fargs.communityId = 123
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
]

const ErrSolver = []

export function init(selectedStore) {
  tagEditor = selectedStore
  debug(tagEditor)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
