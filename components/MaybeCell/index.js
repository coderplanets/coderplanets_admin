/*
 *
 * MaybeCell
 *
 */

import React from 'react'
import T from 'prop-types'
import styled from 'styled-components'

import { buildLog, isEmptyNil } from '@utils'
/* eslint-disable no-unused-vars */
const log = buildLog('c:MaybeCell:index')
/* eslint-enable no-unused-vars */

export const NoneText = styled.div`
  text-align: ${({ align }) => align};
  font-size: 0.8rem;
  color: lightgrey;
  font-style: italic;
`
const MaybeCell = ({ text, align }) => {
  if (isEmptyNil(text)) {
    return <NoneText align={align}>--</NoneText>
  }
  return <div>{text}</div>
}

MaybeCell.propTypes = {
  text: T.string,
  align: T.oneOf(['left', 'center', 'right']),
}

MaybeCell.defaultProps = {
  text: '',
  align: 'center',
}

export default MaybeCell
