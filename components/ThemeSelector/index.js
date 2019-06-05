/*
 *
 * ThemeSelector
 *
 */

import React from 'react'
import T from 'prop-types'

import { buildLog } from '@utils'
import DotSelector from './DotSelector'
import CardSelector from './CardSelector'

/* eslint-disable no-unused-vars */
const log = buildLog('c:ThemeSelector:index')
/* eslint-enable no-unused-vars */

const ThemeSelector = ({ displayStyle, curTheme, changeTheme }) => {
  return displayStyle === 'default' ? (
    <DotSelector curTheme={curTheme} changeTheme={changeTheme} />
  ) : (
    <CardSelector curTheme={curTheme} changeTheme={changeTheme} />
  )
}

ThemeSelector.propTypes = {
  curTheme: T.string,
  displayStyle: T.oneOf(['default', 'card']),
  changeTheme: T.func.isRequired,
  // https://www.npmjs.com/package/prop-types
}

ThemeSelector.defaultProps = {
  curTheme: '',
  displayStyle: 'default',
}

export default ThemeSelector
