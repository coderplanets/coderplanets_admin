/*
 *
 * FormSelector
 *
 */

import React from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'
import { Select } from 'antd'

import { uid, makeDebugger } from 'utils'
import FormItem from '../FormItem'
import { Note } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:FormSelector:index')
/* eslint-enable no-unused-vars */

const { Option } = Select

const FormSelector = ({ label, options, value, onChange, note }) => (
  <FormItem label={label}>
    <React.Fragment>
      <Select
        defaultValue={value}
        style={{ minWidth: 250 }}
        onChange={onChange}
      >
        {options.map(v => (
          <Option key={uid.gen()} value={v}>
            {v}
          </Option>
        ))}
      </Select>
      {R.isEmpty(note) ? <div /> : <Note>{note}</Note>}
    </React.Fragment>
  </FormItem>
)

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
