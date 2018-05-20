import R from 'ramda'

import {
  makeDebugger,
  $solver,
  gqRes,
  gqErr,
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

let communityEditor = null

export const profileChange = R.curry((part, e) => {
  communityEditor.updateCommunity({
    [part]: e.target.value,
  })
})

export const uploadPic = pic => {
  communityEditor.updateCommunity({
    logo: pic,
  })
}

const wanted = ['title', 'desc', 'raw', 'category', 'logo']
export const updateConfirm = () => {
  const args = {
    ...communityEditor.communityData,
  }

  sr71$.mutate(S.createCommunity, castArgs(args, wanted))
}

// TODO: move to utils: closePreviewer
export function cancleEdit() {
  closePreviewer()
}

// ###############################
// Data & Error handlers
// ###############################

const DataSolver = [
  {
    match: gqRes('createCommunity'),
    action: () => {
      closePreviewer(TYPE.COMMUNITIES_REFRESH)
      // meteorState(communityEditor, 'success', 3)
      // updateDone()
      // cancleLoading()
      // communitiesContent.loadCommunities(data)
    },
  },
]

const ErrSolver = [
  {
    match: gqErr(ERR.CRAPHQL),
    action: ({ details }) => {
      const errMsg = details[0].detail
      meteorState(communityEditor, 'error', 5, errMsg)
      // cancleLoading()
    },
  },
  {
    match: gqErr(ERR.NETWORK),
    action: ({ details }) => {
      debug('ERR.NETWORK -->', details)
    },
  },
]

export function init(selectedStore) {
  communityEditor = selectedStore
  debug(communityEditor)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
