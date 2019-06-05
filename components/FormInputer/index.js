/*
 *
 * FormInputer
 *
 */

import React from 'react'
import T from 'prop-types'
import { Input, InputNumber } from 'antd'
import R from 'ramda'

import { buildLog } from '@utils'
import FormItem from '../FormItem'
import { FormInput, Note } from './styles'

/* eslint-disable no-unused-vars */
const log = buildLog('c:FormInputer:index')
/* eslint-enable no-unused-vars */

const { TextArea } = Input

const FormInputer = ({ label, value, onChange, note, type, disabled }) => {
  switch (type) {
    case 'number': {
      return (
        <FormItem label={label}>
          <InputNumber
            min={0}
            defaultValue={0}
            onChange={onChange}
            disabled={disabled}
          />
          {R.isEmpty(note) ? <div /> : <Note>{note}</Note>}
        </FormItem>
      )
    }
    case 'textarea': {
      return (
        <FormItem label={label}>
          <FormInput>
            <TextArea
              value={value}
              placeholder={value}
              autosize={{ minRows: 3, maxRows: 6 }}
              onChange={onChange}
              disabled={disabled}
            />
            {R.isEmpty(note) ? <div /> : <Note>{note}</Note>}
          </FormInput>
        </FormItem>
      )
    }

    default: {
      return (
        <FormItem label={label}>
          <FormInput>
            <Input
              size="default"
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
            {R.isEmpty(note) ? <div /> : <Note>{note}</Note>}
          </FormInput>
        </FormItem>
      )
    }
  }
}

FormInputer.propTypes = {
  // https://www.npmjs.com/package/prop-types
  onChange: T.func,
  label: T.string,
  value: T.string,
  note: T.string,
  type: T.oneOf(['default', 'textarea', 'number']),
  disabled: T.bool,
}

FormInputer.defaultProps = {
  onChange: log,
  value: '',
  label: '',
  note: '',
  type: 'default',
  disabled: false,
}

export default FormInputer
