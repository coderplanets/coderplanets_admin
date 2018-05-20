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

const wanted = ['title', 'desc', 'raw', 'category', 'logo']
export const updateConfirm = () => {
  debug('updateConfirm: ', communityEditor.communityData)
  const args = {
    ...communityEditor.communityData,
  }
  args.logo =
    'https://coderplanets.oss-cn-beijing.aliyuncs.com/icons/pl/elixir.svg'

  console.log('args: ', args)
  console.log('castArgs args: ', castArgs(args, wanted))
  sr71$.mutate(S.createCommunity, args)
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
]

export function init(selectedStore) {
  communityEditor = selectedStore
  debug(communityEditor)
  if (sub$) sub$.unsubscribe()
  sub$ = sr71$.data().subscribe($solver(DataSolver, ErrSolver))
}
