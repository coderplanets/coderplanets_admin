/*
 *
 * PermissionCell
 *
 */

import React from 'react'
import R from 'ramda'
import PropTypes from 'prop-types'

import { uid, makeDebugger, isEmptyNil, isObject, objToArray } from 'utils'
import AdderCell from '../AdderCell'

import {
  Wrapper,
  Number,
  RootNumber,
  Label,
  UnitText,
  NumberInfo,
  PermissionWrapper,
} from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:PermissionCell:index')
/* eslint-enable no-unused-vars */

const valueIsObj = v => isObject(v)
const valueIsNotObj = R.complement(valueIsObj)

const key = R.compose(
  R.head,
  R.keys
)
const value = R.compose(
  R.head,
  R.values
)

const CommunityPermissions = ({ data }) => {
  if (!data) return <div />
  const dataArray = objToArray(data)

  return (
    <React.Fragment>
      {dataArray.map(v => (
        <PermissionWrapper key={uid.gen()}>
          <Label>{key(v)}: </Label>
          <NumberInfo>
            <Number>{R.length(R.keys(value(v)))}</Number>
            <UnitText>项</UnitText>
          </NumberInfo>
        </PermissionWrapper>
      ))}
    </React.Fragment>
  )
}

const RootPermissions = ({ data }) => {
  if (isEmptyNil(data)) return <div />
  const plength = R.keys(data)

  return (
    <PermissionWrapper>
      <Label>general: </Label>
      <NumberInfo>
        <RootNumber>{plength.length}</RootNumber>
        <UnitText>项</UnitText>
      </NumberInfo>
    </PermissionWrapper>
  )
}

const PermissionCell = ({ source, onMutate }) => {
  const cmsps = source.cmsPassportString
  if (isEmptyNil(cmsps)) {
    return <AdderCell onAdd={onMutate.bind(this, source)} />
  }
  const pjson = JSON.parse(cmsps)
  const cdata = R.pickBy(valueIsObj, pjson)
  const rdata = R.pickBy(valueIsNotObj, pjson)

  return (
    <Wrapper onClick={onMutate.bind(this, source)}>
      <CommunityPermissions data={cdata} />
      <RootPermissions data={rdata} />
    </Wrapper>
  )
}

PermissionCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  onMutate: PropTypes.func.isRequired,
  source: PropTypes.object.isRequired,
}

PermissionCell.defaultProps = {}

export default PermissionCell
