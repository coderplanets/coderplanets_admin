import R from 'ramda'

/* import { Observable } from 'rxjs/Observable' */
import { of } from 'rxjs'

import { buildLog, ERR } from '..'
import { TIMEOUT_THRESHOLD } from './setup'

/* eslint-disable no-unused-vars */
const log = buildLog('Network')
/* eslint-enable no-unused-vars */

export const TimoutObservable = of({
  error: ERR.TIMEOUT,
  details: `server has no-response in ${TIMEOUT_THRESHOLD} secs`,
})

// refator later
const fomatDetail = errors => {
  const details = []
  errors.map(({ message, path, key, code }) => {
    if (Array.isArray(message)) {
      return message.map(msg => {
        return details.push({
          detail: msg.message,
          path: path ? R.join(' |> ', path) : '',
          key: msg.key || '',
          code,
        })
      })
    }
    return details.push({
      detail: key ? `${key}:${message}` : `${message}`,
      path: path ? R.join(' |> ', path) : '',
      key: key || '',
      code,
    })
  })
  return details
}

export const formatGraphErrors = error => {
  if (Array.isArray(error))
    return { error: ERR.CRAPHQL, details: fomatDetail(error) }

  const { graphQLErrors } = error
  if (!R.isEmpty(graphQLErrors)) {
    // graphQLErrors may not catch in graph query (wrang sytax etc ...)
    // checkout this issue https://github.com/apollographql/apollo-client/issues/2810
    return { error: ERR.CRAPHQL, details: fomatDetail(graphQLErrors) }
  }
  return { error: ERR.NETWORK, details: 'checkout your server or network' }
}

export const getThenHandler = res => {
  switch (true) {
    case res.status >= 200 && res.status < 300:
      return Promise.resolve(res.text())
    case res.status === 404:
      return Promise.reject({
        error: ERR.NOT_FOUND,
        details: `${res.url}`,
      })
    default:
      log('unhandle error: ', res)
      return Promise.reject({
        error: 10000,
        details: `${res.statusText}: unhandle`,
      })
  }
}

export const getCatchHandler = err => {
  /*
     if (!navigator.onLine) {
     return { error: 'NET_OFFLINE', details: 'NET_OFFLINE' }
     }
   */

  switch (true) {
    case err.error === ERR.NOT_FOUND:
      return { error: err.error, details: err.details }
    default:
      return { error: err.error, details: err.details }
  }
}
