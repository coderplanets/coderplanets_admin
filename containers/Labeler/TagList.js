import React from 'react'

import { uid } from 'utils'
import { Wrapper, TagItem, TagDot, TagTitle } from './styles/tag_list'

const TagList = ({ data }) => (
  <Wrapper>
    {data.map(tag => (
      <TagItem key={uid.gen()}>
        <TagDot color={tag.color} />
        <TagTitle title={tag.title}>{tag.title}</TagTitle>
      </TagItem>
    ))}
  </Wrapper>
)

export default TagList
