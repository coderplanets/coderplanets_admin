/*
 *
 * MaybeCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { makeDebugger, isEmptyNil } from 'utils'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:MaybeCell:index')
/* eslint-enable no-unused-vars */

export const NoneText = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: lightgrey;
  font-style: italic;
`
const MaybeCell = ({ text }) => {
  if (isEmptyNil(text)) {
    return <NoneText>暂无</NoneText>
  }
  return <div>{text}</div>
}

MaybeCell.propTypes = {
  text: PropTypes.string,
}

MaybeCell.defaultProps = {
  text: '',
}

export default MaybeCell
