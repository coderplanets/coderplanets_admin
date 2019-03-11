import R from 'ramda'
import { request, GraphQLClient } from 'graphql-request'

import { GRAPHQL_ENDPOINT, PAGE_SIZE } from 'config'
import { nilOrEmpty } from './validator'

export const asyncRes = R.curry((key, obj) => R.and(obj[key], R.has(key, obj)))
export const asyncErr = key => R.pathEq(['error'], key)

// NOTE the client with jwt info is used for getInitialProps for SSR
// to load user related data
export const makeGQClient = token => {
  if (!nilOrEmpty(token)) {
    const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    return client
  }
  return {
    request: (schema, query) => request(GRAPHQL_ENDPOINT, schema, query),
  }
}

export const makeGithubExplore = (GRAPHQL_ENDPOINT, token) => {
  const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      authorization: `bearer ${token}`,
    },
  })
  return client
}

export const pagedFilter = (page, options = {}) =>
  R.merge({ page, size: PAGE_SIZE.D }, options)

// NOTE: this is a simple hack for send parallel requests in rxjs
// in rxjs, if you want to send parallel request you should use complex method
// like forkJoin .. which need to refactor whole sr71 part
// currently the simple later is fine
export const later = (func, time = 200) => setTimeout(func, time)
