/*
 *
 * FormSelector
 *
 */

import React from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import { Select } from 'antd'

import { makeDebugger } from '../../utils'
import { FormItemWrapper, FormLable, Note } from './styles'
/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:FormSelector:index')
/* eslint-enable no-unused-vars */

const { Option } = Select

const FormSelector = ({ label, options, value, onChange, note }) => {
  return (
    <FormItemWrapper>
      <FormLable>{label}</FormLable>

      <Select
        defaultValue={value}
        style={{ minWidth: 250 }}
        onChange={onChange}
      >
        {options.map(v => (
          <Option key={shortid.generate()} value={v}>
            {v}
          </Option>
        ))}
      </Select>
      {R.isEmpty(note) ? <div /> : <Note>{note}</Note>}
    </FormItemWrapper>
  )
}

FormSelector.propTypes = {
  // https://www.npmjs.com/package/prop-types
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  note: PropTypes.string,
}

FormSelector.defaultProps = {
  onChange: debug,
  value: '',
  label: '',
  note: '',
}

export default FormSelector
