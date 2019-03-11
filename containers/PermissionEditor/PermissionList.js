import React from 'react'
import R from 'ramda'

import { ICON_CMD } from 'config'

import {
  uid,
  isEmptyNil,
  isObject,
  maybe,
  mapKey,
  mapValue,
  objToArray,
} from 'utils'
import {
  Wrapper,
  PermissionWrapper,
  PerItem,
  PerTitle,
  CheckIcon,
} from './styles/permission_list'

import { onRuleClick } from './logic'

const valueIsObj = v => isObject(v)
const valueIsNotObj = R.complement(valueIsObj)

const getCurUserRules = (data, curView, activeRaw) => {
  const userPermissions = JSON.parse(data)
  const userRulesByCommunities = R.filter(valueIsObj, userPermissions)

  if (curView === 'general') {
    return R.pickBy(valueIsNotObj, userPermissions)
  }

  return maybe(userRulesByCommunities[activeRaw], {})
}

const getJson = value => {
  return isEmptyNil(value) ? {} : JSON.parse(value)
}

const CheckMark = ({ active }) => {
  return <CheckIcon src={`${ICON_CMD}/check.svg`} active={active} />
}

const PermissionList = ({
  data,
  allRules,
  selectRules,
  curView,
  activeRaw,
}) => {
  data = isEmptyNil(data) ? '{}' : data

  const curUserRules = getCurUserRules(data, curView, activeRaw)
  const selectGeneralRules = R.filter(valueIsNotObj, selectRules)
  const selectCommunityRules = R.filter(valueIsObj, selectRules)

  const curAllRules =
    curView === 'general'
      ? getJson(allRules.general)
      : getJson(allRules.community)

  const curSelectRules =
    curView === 'general' ? selectGeneralRules : selectCommunityRules[activeRaw]

  const curActiveRules = R.merge(curUserRules, curSelectRules)
  const ruleArray = objToArray(R.merge(curAllRules, curActiveRules))

  return (
    <Wrapper>
      <PermissionWrapper>
        <React.Fragment>
          {ruleArray.map(p => (
            <PerItem key={uid.gen()} onClick={onRuleClick.bind(this, p)}>
              <PerTitle>{mapKey(p)}</PerTitle>{' '}
              <CheckMark active={mapValue(p)} />
            </PerItem>
          ))}
        </React.Fragment>
      </PermissionWrapper>
    </Wrapper>
  )
}

export default PermissionList
