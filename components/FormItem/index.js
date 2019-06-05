/*
 *
 * FormItem
 *
 */

import React from 'react'
import T from 'prop-types'

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
  label: T.string.isRequired,
  children: T.node.isRequired,
}

FormItem.defaultProps = {}

export default FormItem
