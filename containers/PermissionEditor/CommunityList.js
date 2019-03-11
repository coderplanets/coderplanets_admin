import React from 'react'
import R from 'ramda'

import { CommunityMatrix } from 'components'
import { isEmptyNil, isObject } from 'utils'
import { Wrapper } from './styles/community_list'

import { communitySelect, communityAddOnSelect } from './logic'

const getManagedCommunitiesRaws = userRules => {
  const userRulesByCommunities = R.filter(isObject, JSON.parse(userRules))
  const ckeys = R.keys(userRulesByCommunities)

  return ckeys
}

const CommunityList = ({ data, userRules, activeRaw }) => {
  if (!data) return <div />
  userRules = isEmptyNil(userRules) ? '{}' : userRules

  const managerdRaws = getManagedCommunitiesRaws(userRules)

  return (
    <Wrapper>
      <CommunityMatrix
        data={data}
        onSelect={communitySelect}
        onAddOnSelect={communityAddOnSelect}
        activeRaw={activeRaw}
        lens={managerdRaws}
      />
    </Wrapper>
  )
}

export default CommunityList
