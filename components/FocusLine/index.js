/*
 *
 * FocusLine
 *
 */

import React from 'react'
import R from 'ramda'
import T from 'prop-types'

import { makeDebugger } from '@utils'
import { Wrapper, Icon, TextWrapper, Text, Focus } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:FocusLine:index')
/* eslint-enable no-unused-vars */

const FocusLine = ({ iconSrc, before, focus, after }) => (
  <Wrapper>
    <Icon src={iconSrc} show={!R.isEmpty(iconSrc)} />
    <TextWrapper>
      <Text>{before}</Text> <Focus>{focus}</Focus> <Text>{after}</Text>
    </TextWrapper>
  </Wrapper>
)

FocusLine.propTypes = {
  iconSrc: T.string,
  before: T.string.isRequired,
  focus: T.oneOfType([T.number, T.string]).isRequired,
  after: T.string.isRequired,
}

FocusLine.defaultProps = {
  iconSrc: '',
}

export default FocusLine
