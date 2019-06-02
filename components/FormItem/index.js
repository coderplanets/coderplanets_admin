/*
 *
 * FormItem
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { makeDebugger } from '@utils'

import { FormItemWrapper, FormLable, ChildWrapper } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:FormItem:index')
/* eslint-enable no-unused-vars */

const FormItem = ({ label, children }) => (
  <FormItemWrapper>
    <FormLable>{label}</FormLable>
    <ChildWrapper>{children}</ChildWrapper>
  </FormItemWrapper>
)

FormItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

FormItem.defaultProps = {}

export default FormItem
