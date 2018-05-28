import {
  asyncRes,
  $solver,
  makeDebugger,
  EVENT,
  holdPage,
  TYPE,
  dispatchEvent,
} from '../../utils'
import SR71 from '../../utils/network/sr71'

// const sr71$ = new SR71({ resv_event: EVENT.PREVIEW })
const sr71$ = new SR71({
  resv_event: [
    EVENT.NAV_EDIT,
    EVENT.PREVIEW,
    EVENT.NAV_CREATE_POST,
    EVENT.PREVIEW_CLOSE,
    EVENT.NAV_CREATE_COMMUNITY,
    EVENT.NAV_UPDATE_COMMUNITY,
    EVENT.NAV_CREATE_TAG,
    // EVENT.NAV_UPDATE_TAG,
    EVENT.NAV_CREATE_CATEGORY,
    EVENT.NAV_SET_CATEGORY,
    EVENT.NAV_UPDATE_CATEGORY,
    // tag
    EVENT.NAV_SET_TAG,
  ],
})

const debug = makeDebugger('L:Preview')

let preview = null
let sub$ = null

export function closePreview() {
  debug('closePreview')
  preview.close()

  // force call Typewriter's componentWillUnmount to store the draft
  // wait until preview move out of the screean
  setTimeout(() => {
    preview.markState({ type: null })
    dispatchEvent(EVENT.PREVIEW_CLOSED)
  }, 200)
}

function loadDataForPreview(info) {
  debug('loadDataForPreview --> : ', info)
  if (info.type === TYPE.POST_PREVIEW_VIEW) {
    // debug('load fucking post: ', info.data)
    dispatchEvent(EVENT.PREVIEW_POST, { type: TYPE.POST, data: info.data })
    // loadPost(info.data)
  }
}

const DataResolver = [
  {
    match: asyncRes(EVENT.PREVIEW),
    action: res => {
      const event = res[EVENT.PREVIEW]

      preview.open(event.type)
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

      preview.open(event.type)
      loadDataForPreview(res[EVENT.NAV_EDIT])
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_CREATE_POST),
    action: res => {
      const event = res[EVENT.NAV_CREATE_POST]

      preview.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_CREATE_COMMUNITY),
    action: res => {
      const event = res[EVENT.NAV_CREATE_COMMUNITY]

      preview.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_UPDATE_COMMUNITY),
    action: res => {
      const event = res[EVENT.NAV_UPDATE_COMMUNITY]

      preview.markState({ editCommunity: event.data })
      preview.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_CREATE_TAG),
    action: res => {
      const event = res[EVENT.NAV_CREATE_TAG]

      preview.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_CREATE_CATEGORY),
    action: res => {
      const event = res[EVENT.NAV_CREATE_CATEGORY]

      preview.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_UPDATE_CATEGORY),
    action: res => {
      const event = res[EVENT.NAV_UPDATE_CATEGORY]

      preview.markState({ editCategory: event.data })
      preview.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_SET_CATEGORY),
    action: res => {
      const event = res[EVENT.NAV_SET_CATEGORY]

      preview.markState({ editCommunity: event.data })
      preview.open(event.type)
      holdPage()
    },
  },
  {
    match: asyncRes(EVENT.NAV_SET_TAG),
    action: res => {
      const event = res[EVENT.NAV_SET_TAG]

      preview.markState({ editTag: event.data })
      preview.open(event.type)
      holdPage()
    },
  },
]

export function init(selectedStore) {
  preview = selectedStore
  debug('@@@ init @@0')
  if (sub$) sub$.unsubscribe()

  // sub$ = sr71$.data().subscribe(handleData)
  sub$ = sr71$.data().subscribe($solver(DataResolver, []))
}
