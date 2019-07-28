/*
 *
 * TagSetter
 *
 */

import React from 'react'
import R from 'ramda'

import { uid, buildLog, connectStore } from '@utils'

import { CommunityMatrix } from '@components'
import {
  Wrapper,
  Divider,
  CategoryWrapper,
  CategoryTag,
  CommunityLogo,
  SetterTitle,
  ThreadText,
} from './styles'

import { useInit, onAdd, selectCommunity } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:TagSetter')
/* eslint-enable no-unused-vars */

const TagsList = ({ tags, threadId, selectedids }) => (
  <CategoryWrapper>
    {tags.map(c => (
      <CategoryTag
        key={uid.gen()}
        active={R.contains(c.id, selectedids)}
        onClick={onAdd.bind(
          this,
          c.thread,
          threadId,
          c.id,
          c.community.id,
          selectedids
        )}
      >
        <CommunityLogo src={c.community.logo} />
        <ThreadText>({c.thread})</ThreadText>
        {c.title}
      </CategoryTag>
    ))}
  </CategoryWrapper>
)

const TagSetterContainer = ({ tagSetter, editData }) => {
  useInit(tagSetter)

  const { tagsData, activeCommunityRaw } = tagSetter

  const source = editData.data
  const { communities } = source
  /* const { thread } = editData */
  const selectedids = R.pluck('id', source.tags)
  const { id, title } = source

  return (
    <Wrapper>
      <SetterTitle>{title}</SetterTitle>
      <h2>设置标签</h2>
      <Divider />
      {R.isEmpty(communities) ? (
        <h4>该内容不属于任何社区,因此不能设置标签，请先设置社区</h4>
      ) : (
        <CommunityMatrix
          array={communities}
          activeRaw={activeCommunityRaw}
          onSelect={selectCommunity}
          hasAddon={false}
        />
      )}

      <Divider />

      <TagsList tags={tagsData} threadId={id} selectedids={selectedids} />
    </Wrapper>
  )
}

export default connectStore(TagSetterContainer)
