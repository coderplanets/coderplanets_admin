import React from 'react'

// import { ICON_CMD } from '@config'
// import { Wrapper } from './styles'
import { uid } from '@utils'
import { Wrapper, TagWrapper, ColorDot, DeleteCross } from './styles/tags_list'

const TagsList = ({ source, onDelete }) => (
  <Wrapper>
    {source.tags.map(c => (
      <TagWrapper key={uid.gen()} onClick={onDelete.bind(this, source.id, c)}>
        <ColorDot bg={c.color} />
        <div>{c.title}</div>
        <DeleteCross>x</DeleteCross>
      </TagWrapper>
    ))}
  </Wrapper>
)

export default TagsList
