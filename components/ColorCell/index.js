/*
 *
 * ColorCell
 *
 */

import React from 'react'
import T from 'prop-types'

import { buildLog } from '@utils'

import { ColorCell, ColorDot /* ColorTitle */ } from './styles'
/* eslint-disable no-unused-vars */
const log = buildLog('c:ColorCell:index')
/* eslint-enable no-unused-vars */

const ColorCellComponent = ({ color }) => {
  return (
    <ColorCell>
      <ColorDot color={color} />
      {/* <ColorTitle>{color}</ColorTitle> */}
    </ColorCell>
  )
}

ColorCellComponent.propTypes = {
  // https://www.npmjs.com/package/prop-types
  color: T.string,
}

ColorCellComponent.defaultProps = {
  color: 'RED',
}

export default ColorCellComponent
