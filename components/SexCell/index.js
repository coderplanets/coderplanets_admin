/*
 *
 * SexCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { ICON_CMD } from '../../config'
import { DudeIcon, GirlIcon } from './styles'
import { makeDebugger } from '../../utils'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:SexCell:index')
/* eslint-enable no-unused-vars */

const SexCell = ({ sex }) => {
  if (sex === 'dude') {
    return <DudeIcon src={`${ICON_CMD}/dude.svg`} />
  }
  return <GirlIcon src={`${ICON_CMD}/girl.svg`} />
}

SexCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  sex: PropTypes.oneOf(['dude', 'girl']),
}

SexCell.defaultProps = {
  sex: 'dude',
}

export default SexCell
