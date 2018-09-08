import R from 'ramda'

import {
  makeDebugger,
  $solver,
  asyncRes,
  asyncErr,
  ERR,
  TYPE,
  meteorState,
  closePreviewer,
  castArgs,
} from '../../utils'
import S from './schema'
import SR71 from '../../utils/network/sr71'

const sr71$ = new SR71()
let sub$ = null

/* eslint-disable no-unused-vars */
const debug = makeDebugger('L:CommunityEditor')
/* eslint-enable no-unused-vars */

let store = null

export const profileChange = R.curry((thread, e) => {
  store.updateCommunity({
    [thread]: e.target.value,
  })
})

export const uploadPic = pic => {
  store.updateCommunity({ logo: pic })
}

export const mutateConfirm = () => {
  const requiredArgs = ['title', 'desc', 'raw', 'category', 'logo']
  const args = {
    ...store.communityData,
  }

  store.markState({ mutating: true })

  if (store.isEdit) {
    return sr71$.mutate(
      S.updateCommunity,
      castArgs(args, ['id', ...requiredArgs])
    )
  }

  return sr71$.mutate(S.createCommunity, castArgs(args, requiredArgs))
}

const initEditData = editData => {
  store.markState({
    community: editData,
    isEdit: true,
  })
}

// TODO: move to utils: closePreviewer
export function cancleEdit() {
  store.markState({
    community: {},
    isEdit: false,
  })
  closePreviewer()
}

// ###############################
// Data & Error handlers
// ###############################

const cancleLoading = () => {
  store.markState({ mutating: false })
}

const DataSolver = [
  {
    match: asyncRes('createCommunity'),
    action: () => {
      closePreviewer(TYPE.COMMUNITIES_REFRESH)
    },
  },
  {
    match: asyncRes('updateCommunity'),
    action: () => {
      closePreviewer(TYPE.COMMUNITIES_REFRESH)
    },
  },
]

const ErrSolver = [
  {
    match: asyncErr(ERR.CRAPHQL),
    action: ({ details }) => {
      const errMsg = details[0].detail
      meteorState(store, 'error', 5, errMsg)
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

export function init(selectedStore, editData) {
  store = selectedStore

  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))

  if (editData) {
    initEditData(editData)
  }
}

export function uninit() {
  cancleEdit()
  cancleLoading()
}
