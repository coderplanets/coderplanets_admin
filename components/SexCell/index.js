/*
 *
 * SexCell
 *
 */

import React from 'react'
import T from 'prop-types'

import { ICON_CMD } from '@config'
import { buildLog } from '@utils'
import { DudeIcon, GirlIcon } from './styles'

/* eslint-disable no-unused-vars */
const log = buildLog('c:SexCell:index')
/* eslint-enable no-unused-vars */

const SexCell = ({ sex }) => {
  if (sex === 'dude') {
    return <DudeIcon src={`${ICON_CMD}/dude.svg`} />
  }
  return <GirlIcon src={`${ICON_CMD}/girl.svg`} />
}

SexCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  sex: T.oneOf(['dude', 'girl']),
}

SexCell.defaultProps = {
  sex: 'dude',
}

export default SexCell
