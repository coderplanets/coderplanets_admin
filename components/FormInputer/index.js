/*
 *
 * FormInputer
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Input, InputNumber } from 'antd'
import R from 'ramda'

import { makeDebugger } from '@utils'
import FormItem from '../FormItem'
import { FormInput, Note } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:FormInputer:index')
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
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  note: PropTypes.string,
  type: PropTypes.oneOf(['default', 'textarea', 'number']),
  disabled: PropTypes.bool,
}

FormInputer.defaultProps = {
  onChange: debug,
  value: '',
  label: '',
  note: '',
  type: 'default',
  disabled: false,
}

export default FormInputer
