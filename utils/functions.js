import R from 'ramda'
import PubSub from 'pubsub-js'

import { TAG_COLOR_ORDER } from '@config'
import { EVENT } from './constants'
import { nilOrEmpty, isEmptyNil } from './validator'

/* eslint-disable */
// TODO: document ?
export const Global = typeof window !== 'undefined' ? window : global
export const onClient = typeof window !== 'undefined' ? true : false

/* eslint-enable */

// see https://github.com/ramda/ramda/issues/1361
export const mapKeys = R.curry((fn, obj) => {
  return R.reduce(
    (acc, key) => {
      acc[fn(key)] = obj[key]
      return acc
    },
    {},
    R.keys(obj)
  )
})

/* eslint-disable */
const log = (...args) => data => {
  console.log.apply(null, args.concat([data]))
  return data
}
/* eslint-enable */

export const maybe = (value, defVal = '') =>
  !isEmptyNil(value) ? value : defVal

export const objToArray = input =>
  Object.keys(input).map(key => {
    return { [key]: input[key] }
  })

export const mapKey = R.compose(
  R.head,
  R.keys
)
export const mapValue = R.compose(
  R.head,
  R.values
)

export const sortByColor = source =>
  R.sort(
    (t1, t2) => TAG_COLOR_ORDER[t1.color] - TAG_COLOR_ORDER[t2.color],
    source
  )

export const sortByIndex = source => R.sort((a, b) => a.index - b.index, source)

// reference: https://blog.carbonfive.com/2017/12/20/easy-pipeline-debugging-with-curried-console-log/
export const Rlog = (arg = 'Rlog: ') => R.tap(log(arg))

export const cutFrom = (val, cutnumber = 20) => {
  if (nilOrEmpty(val)) {
    return ''
  }
  if (val.length <= cutnumber) {
    return val
  }
  return `${R.slice(0, cutnumber, val)} ...`
}

// https://stackoverflow.com/questions/9461621/how-to-format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900-in-javascrip
export const prettyNum = (num, digits = 1) => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break
    }
  }
  /* eslint-disable */
  if (num < 1000) {
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
  }
  return (
    (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol + '+'
  )
  /* eslint-enable  */
}

// from https://stackoverflow.com/questions/20396456/how-to-do-word-counts-for-a-mixture-of-english-and-chinese-in-javascript
// count both chinese-word and english-words
export function countWords(str) {
  const matches = str.match(/[\u00ff-\uffff]|\S+/g)
  return matches ? matches.length : 0
}

export function toPercentNum(top, bottom) {
  const topNum = parseInt(top, 10)
  const bottomNum = parseInt(bottom, 10)

  if (topNum >= bottomNum) return '100%'
  const flostNum = topNum / bottomNum
  const fixedNum = flostNum.toFixed(2) * 100
  return `${fixedNum}%`
}

export const send = (msg, data = {}) => PubSub.publish(msg, data)
export const closePreviewer = (type = '') => send(EVENT.PREVIEW_CLOSE, { type })

export const errRescue = ({ type, operation, details, path }) =>
  send(EVENT.ERR_RESCUE, { type, data: { operation, details, path } })

/* eslint-disable */
export function debounce(func, wait, immediate) {
  let timeout
  return function() {
    const context = this
    const args = arguments
    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
/* eslint-enable */

export function extractMentions(text) {
  const mentionsRegex = new RegExp('@([a-zA-Z0-9_.]+)', 'gim')

  let matches = text.match(mentionsRegex)
  if (matches && matches.length) {
    matches = matches.map(match => {
      return match.slice(1)
    })
    return R.uniq(matches)
  }
  return []
}

export const extractAttachments = str => {
  let m
  const regex = /!\[(.*?)\]\((.*?)\)/g

  const urls = []
  /* eslint-disable */
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex += 1
    }
    urls.push(m[2])
  }
  /* eslint-enable */
  return urls
}
