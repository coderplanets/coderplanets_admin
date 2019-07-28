import { asyncSuit, buildLog, EVENT, holdPage, TYPE, send } from '@utils'

const log = buildLog('L:Preview')

const { SR71, asyncRes, $solver } = asyncSuit
const sr71$ = new SR71({
  recieve: [
    EVENT.NAV_EDIT,
    EVENT.PREVIEW,
    EVENT.NAV_CREATE_POST,
    EVENT.PREVIEW_CLOSE,
    EVENT.NAV_CREATE_COMMUNITY,
    EVENT.NAV_UPDATE_COMMUNITY,
    EVENT.NAV_SET_COMMUNITY,
    // tag
    EVENT.NAV_CREATE_TAG,
    EVENT.NAV_UPDATE_TAG,
    EVENT.NAV_SET_TAG,
    // category
    EVENT.NAV_CREATE_CATEGORY,
    EVENT.NAV_SET_CATEGORY,
    EVENT.NAV_UPDATE_CATEGORY,
    // threahd
    EVENT.NAV_CREATE_THREAD,
    EVENT.NAV_SET_THREAD,
    // permission
    EVENT.NAV_UPDATE_PERMISSION,
  ],
})

let store = null
let sub$ = null

export function closePreview() {
  store.close()

  // force call Typewriter's componentWillUnmount to store the draft
  // wait until store move out of the screean
  setTimeout(() => {
    store.markState({ type: null })
    log('closePreview ...')
    send(EVENT.PREVIEW_CLOSED)
  }, 200)
}

function loadDataForPreview(info) {
  log('loadDataForPreview --> : ', info)
  if (info.type === TYPE.POST_PREVIEW_VIEW) {
    send(EVENT.PREVIEW_POST, { type: TYPE.POST, data: info.data })
    // loadPost(info.data)
  }
}

const DataResolver = [
  {
    match: asyncRes(EVENT.PREVIEW),
    action: res => {
      const event = res[EVENT.PREVIEW]

      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.PREVIEW_CLOSE),
    action: () => closePreview(),
  },
  {
    match: asyncRes(EVENT.NAV_EDIT),
    action: res => {
      const event = res[EVENT.NAV_EDIT]

      store.open(event.type)
      loadDataForPreview(res[EVENT.NAV_EDIT])
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_CREATE_POST),
    action: res => {
      const event = res[EVENT.NAV_CREATE_POST]

      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_CREATE_COMMUNITY),
    action: res => {
      const event = res[EVENT.NAV_CREATE_COMMUNITY]

      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_UPDATE_COMMUNITY),
    action: res => {
      const event = res[EVENT.NAV_UPDATE_COMMUNITY]

      store.markState({ editCommunity: event.data })
      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_SET_COMMUNITY),
    action: res => {
      const event = res[EVENT.NAV_SET_COMMUNITY]
      store.markState({
        editArticle: {
          thread: event.data.thread,
          data: event.data.source,
        },
      })
      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_CREATE_TAG),
    action: res => {
      const event = res[EVENT.NAV_CREATE_TAG]

      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_UPDATE_TAG),
    action: res => {
      const event = res[EVENT.NAV_UPDATE_TAG]

      store.markState({ editTag: event.data })
      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_CREATE_CATEGORY),
    action: res => {
      const event = res[EVENT.NAV_CREATE_CATEGORY]

      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_UPDATE_CATEGORY),
    action: res => {
      const event = res[EVENT.NAV_UPDATE_CATEGORY]

      store.markState({ editCategory: event.data })
      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_SET_CATEGORY),
    action: res => {
      const event = res[EVENT.NAV_SET_CATEGORY]

      store.markState({ editCommunity: event.data })
      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_CREATE_THREAD),
    action: res => {
      const event = res[EVENT.NAV_CREATE_THREAD]
      console.log('NAV_CREATE_THREAD data: ', event.data)

      store.markState({ editCommunity: event.data })
      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_SET_THREAD),
    action: res => {
      const event = res[EVENT.NAV_SET_THREAD]

      store.markState({ editCommunity: event.data })
      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_SET_TAG),
    action: res => {
      const event = res[EVENT.NAV_SET_TAG]
      store.markState({
        editArticle: {
          thread: event.data.thread,
          data: event.data.source,
        },
      })
      store.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_UPDATE_PERMISSION),
    action: res => {
      const event = res[EVENT.NAV_UPDATE_PERMISSION]
      console.log('hello --> ')
      store.markState({
        editPermission: {
          type: event.data.type,
          data: event.data.source,
        },
      })
      store.open(event.type)
      holdPage()
    },
  },
]

export function init(selectedStore) {
  store = selectedStore
  if (sub$) sub$.unsubscribe()

  // sub$ = sr71$.data().subscribe(handleData)
  sub$ = sr71$.data().subscribe($solver(DataResolver, []))
}
