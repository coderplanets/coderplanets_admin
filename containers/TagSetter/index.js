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
  SetterTitle,
  PartText,
} from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:TagSetter')
/* eslint-enable no-unused-vars */

const TagsList = ({ tags, partId, selectedids }) => {
  return (
    <CategoryWrapper>
      {tags.map(c => (
        <CategoryTag
          key={shortid.generate()}
          active={R.contains(c.id, selectedids)}
          onClick={logic.onAdd.bind(
            this,
            c.part,
            partId,
            c.id,
            c.community.id,
            selectedids
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

    const source = editData.data
    /* const { part } = editData */
    const selectedids = R.pluck('id', source.tags)
    const { id, title } = source

    return (
      <Wrapper>
        <SetterTitle>{title}</SetterTitle>
        <h2>设置标签</h2>
        <Divider />
        {pagedTagsData ? (
          <TagsList
            tags={pagedTagsData.entries}
            partId={id}
            selectedids={selectedids}
          />
        ) : (
          <div />
        )}
      </Wrapper>
    )
  }
}

export default inject(storePlug('tagSetter'))(observer(TagSetterContainer))