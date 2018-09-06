/*
 *
 * AdderCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { ICON_CMD } from '../../config'

import { makeDebugger } from '../../utils'
import { AddWrapper, AddIcon, AddText } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:AdderCell:index')
/* eslint-enable no-unused-vars */

const AdderCell = ({ onAdd }) => (
  <AddWrapper onClick={onAdd}>
    <AddIcon src={`${ICON_CMD}/plus.svg`} />
    <AddText>添加</AddText>
  </AddWrapper>
)

AdderCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  onAdd: PropTypes.func,
}

AdderCell.defaultProps = {
  onAdd: debug,
}

export default AdderCell
