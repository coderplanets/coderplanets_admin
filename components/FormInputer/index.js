/*
 *
 * FormInputer
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
// import { Input } from '../../components'

import { makeDebugger } from '../../utils'

import { FormItemWrapper, FormLable, FormInput } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:FormInputer:index')
/* eslint-enable no-unused-vars */

const { TextArea } = Input

const FormInputer = ({ label, textarea, value, onChange }) => (
  <FormItemWrapper>
    <FormLable>{label}</FormLable>

    <FormInput>
      {textarea ? (
        <TextArea
          value={value}
          placeholder={value}
          autosize={{ minRows: 3, maxRows: 6 }}
          onChange={onChange}
        />
      ) : (
        <Input size="default" value={value} onChange={onChange} />
      )}
      {/* NOTE info put here */}
    </FormInput>
  </FormItemWrapper>
)

FormInputer.propTypes = {
  // https://www.npmjs.com/package/prop-types
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  textarea: PropTypes.bool,
}

FormInputer.defaultProps = {
  onChange: debug,
  value: '',
  label: '',
  textarea: false,
}

export default FormInputer
