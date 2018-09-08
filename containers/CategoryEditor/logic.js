import R from 'ramda'

import {
  asyncRes,
  TYPE,
  makeDebugger,
  closePreviewer,
  $solver,
  castArgs,
} from '../../utils'
import S from './schema'
import SR71 from '../../utils/network/sr71'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CategoryEditor')
/* eslint-enable no-unused-vars */

let store = null

export const profileChange = R.curry((thread, e) =>
  store.updateCategory({
    [thread]: e.target.value,
  })
)

export const mutateConfirm = () => {
  const requiredArgs = ['title', 'raw']
  const args = { ...store.categoryData }

  store.markState({ mutating: true })
  const fargs = castArgs(args, requiredArgs)

  if (store.isEdit) {
    return sr71$.mutate(
      S.updateCategory,
      castArgs(args, ['id', ...requiredArgs])
    )
  }
  console.log('fargs --- xxx ', fargs)
  return sr71$.mutate(S.createCategory, fargs)
}

export function cancleMutate() {
  store.markState({
    category: {},
    isEdit: false,
  })
  closePreviewer()
}

const initEditData = editData =>
  store.markState({ category: editData, isEdit: true })

// ###############################
// Data & Error handlers
// ###############################
const DataSolver = [
  {
    match: asyncRes('createCategory'),
    action: () => closePreviewer(TYPE.GATEGORIES_REFRESH),
  },
  {
    match: asyncRes('updateCategory'),
    action: () => closePreviewer(TYPE.GATEGORIES_REFRESH),
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
}

export function uninit() {
  cancleMutate()
}
