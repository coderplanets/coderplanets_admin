// side effects, need refactor
/* eslint-disable no-undef */
const hasDocument = typeof document === 'object' && document !== null
const hasWindow =
  typeof window === 'object' && window !== null && window.self === window

export const isBrowser = () => hasDocument && hasWindow
const getDocument = () => (isBrowser() ? document : null)

export const pageGoTop = () => {
  const safeDocument = getDocument()
  if (safeDocument) {
    safeDocument.body.scrollTop = 0 // For Safari
    safeDocument.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Oper
  }
}

// https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView
export const scrollIntoEle = eleID => {
  const safeDocument = getDocument()
  if (!safeDocument) return false

  const e = safeDocument.getElementById(eleID)
  if (!!e && e.scrollIntoView) {
    e.scrollIntoView({ behavior: 'auto' })
  }
}

export const holdPage = () => {
  const safeDocument = getDocument()

  if (safeDocument) {
    const el = safeDocument.getElementById('body')
    el.style.overflowY = 'hidden'
  }
}

export const unholdPage = () => {
  const safeDocument = getDocument()

  if (safeDocument) {
    const el = safeDocument.getElementById('body')
    el.style.overflowY = 'auto'
  }
}

/* eslint-enable no-undef */
