/*
 *
 * AdderCell
 *
 */

import React from 'react'
import T from 'prop-types'

import { ICON_CMD } from '@config'

import { buildLog } from '@utils'
import { AddWrapper, AddIcon, AddText } from './styles'

/* eslint-disable no-unused-vars */
const debug = buildLog('c:AdderCell:index')
/* eslint-enable no-unused-vars */

const AdderCell = ({ onAdd }) => (
  <AddWrapper onClick={onAdd}>
    <AddIcon src={`${ICON_CMD}/plus.svg`} />
    <AddText>添加</AddText>
  </AddWrapper>
)

AdderCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  onAdd: T.func,
}

AdderCell.defaultProps = {
  onAdd: debug,
}

export default AdderCell
