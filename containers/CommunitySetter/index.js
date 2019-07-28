/*
 *
 * CommunitySetter
 *
 */

import React from 'react'
import R from 'ramda'

import { uid, buildLog, connectStore } from '@utils'
import { Pagi } from '@components'

import {
  Wrapper,
  Divider,
  CategoryWrapper,
  CategoryTag,
  CommunityLogo,
  SetterTitle,
} from './styles'

import { useInit, setCommunity, getAllCommunities } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:CommunitySetter')
/* eslint-enable no-unused-vars */

const CommunitiesList = ({ thread, source, communities, selectedids }) => (
  <CategoryWrapper>
    {communities.map(c => (
      <CategoryTag
        key={uid.gen()}
        active={R.contains(c.id, selectedids)}
        onClick={setCommunity.bind(this, thread, source.id, c.id)}
      >
        <CommunityLogo src={c.logo} />
        {c.title}
      </CategoryTag>
    ))}
  </CategoryWrapper>
)

const CommunitySetterContainer = ({ communitySetter, editData }) => {
  useInit(communitySetter)

  const { pagedCommunitiesData } = communitySetter
  const { thread } = editData

  const source = editData.data
  const selectedids = R.pluck('id', source.communities)

  return (
    <Wrapper>
      <SetterTitle>{source.title}</SetterTitle>
      <h2>设置社区</h2>
      <Divider />
      {pagedCommunitiesData ? (
        <React.Fragment>
          <CommunitiesList
            thread={thread}
            source={source}
            communities={pagedCommunitiesData.entries}
            selectedids={selectedids}
          />
          <Divider />
          <div>
            <Pagi
              pageNumber={pagedCommunitiesData.pageNumber}
              pageSize={pagedCommunitiesData.pageSize}
              totalCount={pagedCommunitiesData.totalCount}
              onChange={getAllCommunities}
            />
          </div>
        </React.Fragment>
      ) : (
        <div />
      )}
    </Wrapper>
  )
}

export default connectStore(CommunitySetterContainer)
