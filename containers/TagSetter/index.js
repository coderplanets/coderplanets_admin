/*
 *
 * TagSetter
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
import R from 'ramda'

import shortid from 'shortid'
// import Link from 'next/link'

import { makeDebugger, storePlug } from '../../utils'
import * as logic from './logic'

import {
  Wrapper,
  Divider,
  CategoryWrapper,
  CategoryTag,
  CommunityLogo,
  PartText,
} from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:TagSetter')
/* eslint-enable no-unused-vars */

const TagsList = ({ tags, partId, selectedTids }) => {
  return (
    <CategoryWrapper>
      {tags.map(c => (
        <CategoryTag
          key={shortid.generate()}
          active={R.contains(c.id, selectedTids)}
          onClick={logic.onAdd.bind(
            this,
            c.part,
            partId,
            c.id,
            c.community.id,
            selectedTids
          )}
        >
          <CommunityLogo src={c.community.logo} />
          <PartText>({c.part})</PartText>
          {c.title}
        </CategoryTag>
      ))}
    </CategoryWrapper>
  )
}

class TagSetterContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.tagSetter)
  }

  render() {
    const { tagSetter, editData } = this.props
    const { pagedTagsData } = tagSetter

    const selectedTids = R.pluck('id', editData.tags)
    const { partId } = editData

    return (
      <Wrapper>
        coderplanets
        <h2>设置标签</h2>
        <Divider />
        {pagedTagsData ? (
          <TagsList
            tags={pagedTagsData.entries}
            partId={partId}
            selectedTids={selectedTids}
          />
        ) : (
          <div />
        )}
      </Wrapper>
    )
  }
}

export default inject(storePlug('tagSetter'))(observer(TagSetterContainer))
