/*
 *
 * ColorCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { makeDebugger } from '../../utils'

import { ColorCell, ColorDot /* ColorTitle */ } from './styles'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:ColorCell:index')
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
  color: PropTypes.string,
}

ColorCellComponent.defaultProps = {
  color: 'RED',
}

export default ColorCellComponent
