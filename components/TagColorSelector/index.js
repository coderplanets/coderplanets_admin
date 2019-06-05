/*
 *
 * FormInputer
 *
 */

import React from 'react'
import T from 'prop-types'
import R from 'ramda'

import { TAG_COLORS } from '@config'

import { uid, buildLog } from '@utils'
import {
  FormItemWrapper,
  FormLable,
  SelectorWrapper,
  Note,
  BotWrapper,
  ColorBot,
} from './styles'

/* eslint-disable no-unused-vars */
const log = buildLog('c:TagColorSelector:index')
/* eslint-enable no-unused-vars */

const TagColorSelector = ({ label, value, onChange, note }) => (
  <FormItemWrapper>
    <FormLable>{label}</FormLable>

    <SelectorWrapper>
      {TAG_COLORS.map(v => (
        <BotWrapper key={uid.gen()} active={value === v}>
          <ColorBot color={v} onClick={onChange.bind(this, v)} />
        </BotWrapper>
      ))}
      {R.isEmpty(note) ? <div /> : <Note>{note}</Note>}
    </SelectorWrapper>
  </FormItemWrapper>
)

TagColorSelector.propTypes = {
  onChange: T.func,
  label: T.string,
  value: T.string,
  note: T.string,
}

TagColorSelector.defaultProps = {
  onChange: log,
  value: '',
  label: '',
  note: '',
}

export default TagColorSelector
