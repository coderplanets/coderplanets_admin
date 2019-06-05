/*
 *
 * Maybe
 *
 */

import React from 'react'
import T from 'prop-types'
import R from 'ramda'

import { makeDebugger } from '@utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:Maybe:index')
/* eslint-enable no-unused-vars */

const MaybeLoading = ({ loading }) => {
  if (R.isEmpty(loading)) return null
  return <React.Fragment>{loading}</React.Fragment>
}

const Maybe = ({ children, data, loading }) => {
  if (data === false || R.isEmpty(data))
    return <MaybeLoading loading={loading} />
  return <React.Fragment>{children}</React.Fragment>
}

Maybe.propTypes = {
  // https://www.npmjs.com/package/prop-types
  children: T.node.isRequired,
  data: T.any,
  loading: T.node,
}

Maybe.defaultProps = {
  data: '',
  loading: null,
}

export default Maybe
