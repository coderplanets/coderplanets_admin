/*
 *
 * FormInputer
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import R from 'ramda'

import { makeDebugger } from '../../utils'
import { TAG_COLORS } from '../../config'

import {
  FormItemWrapper,
  FormLable,
  SelectorWrapper,
  Note,
  BotWrapper,
  ColorBot,
} from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:TagColorSelector:index')
/* eslint-enable no-unused-vars */

const TagColorSelector = ({ label, value, onChange, note }) => (
  <FormItemWrapper>
    <FormLable>{label}</FormLable>

    <SelectorWrapper>
      {TAG_COLORS.map(v => (
        <BotWrapper key={shortid.generate()} active={value === v}>
          <ColorBot color={v} onClick={onChange.bind(this, v)} />
        </BotWrapper>
      ))}
      {R.isEmpty(note) ? <div /> : <Note>{note}</Note>}
    </SelectorWrapper>
  </FormItemWrapper>
)

TagColorSelector.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  note: PropTypes.string,
}

TagColorSelector.defaultProps = {
  onChange: debug,
  value: '',
  label: '',
  note: '',
}

export default TagColorSelector
