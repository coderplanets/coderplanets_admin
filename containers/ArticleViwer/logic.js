import R from 'ramda'
import { useEffect } from 'react'

import { EVENT, TYPE } from '@constant'
import { asyncSuit, buildLog } from '@utils'

import S from './schema'

/* eslint-disable no-unused-vars */
const log = buildLog('L:ArticleViwer')
/* eslint-enable no-unused-vars */

const { SR71, asyncRes } = asyncSuit
const sr71$ = new SR71({
  recieve: [EVENT.PREVIEW_POST, EVENT.PREVIEW_CLOSED],
})

let store = null
let sub$ = null

export function onReaction(type, action, isUndo, data) {
  const args = {
    id: data.id,
    type,
    action,
  }
  return isUndo
    ? sr71$.mutate(S.undoReaction, args)
    : sr71$.mutate(S.reaction, args)
}

function loading(maybe = true) {
  store.markState({ postLoading: maybe })
}

function queryPost(data) {
  const variables = {
    id: data.id,
    userHasLogin: false,
  }
  log('--> queryPost make loading')
  loading()
  sr71$.query(S.post, variables)
}

function reloadReactions(data) {
  const variables = {
    id: data.id,
  }
  sr71$.query(S.reactionResult, variables)
}

const dataResolver = [
  {
    match: asyncRes(EVENT.PREVIEW_POST),
    action: res => {
      const info = res[EVENT.PREVIEW_POST]
      /* log('EVENT.PREVIEW_POST: ', res[EVENT.PREVIEW_POST]) */
      if (info.type === TYPE.POST) {
        store.load(TYPE.POST, res[EVENT.PREVIEW_POST].data)
        loading()
        queryPost(info.data)
      }
    },
  },
  {
    match: asyncRes(TYPE.REACTION),
    action: res => {
      // TODO: should be trigger
      log('reaction ', res)
      const info = res[TYPE.REACTION]
      log('hello? queryPost', info)

      reloadReactions(info)
    },
  },
  {
    match: asyncRes(TYPE.UNDO_REACTION),
    action: res => {
      log('undoReaction ', res)
      const info = res[TYPE.UNDO_REACTION]
      reloadReactions(info)
    },
  },
  {
    match: asyncRes(EVENT.PREVIEW_CLOSED),
    action: () => {
      // TODO: test
      sr71$.stop()
      store.load(TYPE.POST, {})
      loading(false)
    },
  },
  {
    match: asyncRes(R.toLower(TYPE.POST)), // GraphQL return
    action: res => {
      store.load(TYPE.POST, res[R.toLower(TYPE.POST)])
      loading(false)
    },
  },
]

const handleData = res => {
  // TODO: handle Error
  if (res.error) {
    log('handleData error ----> : ', res)
  }
  for (let i = 0; i < dataResolver.length; i += 1) {
    if (dataResolver[i].match(res)) {
      return dataResolver[i].action(res)
    }
  }
  log('handleData unhandle: ', res)
}

// ###############################
// init & uninit
// ###############################
export const useInit = _store => {
  useEffect(
    () => {
      store = _store
      if (sub$) sub$.unsubscribe()

      sub$ = sr71$.data().subscribe(handleData)

      return () => {
        if (sub$) sub$.unsubscribe()
        sub$ = null
      }
    },
    [_store]
  )
}
