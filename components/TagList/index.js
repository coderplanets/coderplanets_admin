/*
 *
 * TagList
 *
 */

import React from 'react'
import T from 'prop-types'

import { ICON_CMD } from '@config'
import { uid, buildLog } from '@utils'
import { Wrapper, TagItem, TagDot, TagTitle, AllTagIcon } from './styles'

/* eslint-disable no-unused-vars */
const debug = buildLog('c:TagList:index')
/* eslint-enable no-unused-vars */

const TagList = ({ tags, active, onSelect }) => {
  // const loading= true
  //   <TagsLoading num={7} />

  return (
    <Wrapper>
      {active.title ? (
        <TagItem
          onClick={onSelect.bind(this, {
            title: '',
            color: '',
          })}
        >
          <AllTagIcon src={`${ICON_CMD}/all_tags.svg`} />
          <TagTitle>全部标签</TagTitle>
        </TagItem>
      ) : (
        <div />
      )}

      {tags.map(tag => (
        <TagItem
          key={uid.gen()}
          onClick={onSelect.bind(this, {
            title: tag.title,
            color: tag.color,
            ext: 'helli',
          })}
        >
          <TagDot color={tag.color} active={active.title} title={tag.title} />
          <TagTitle active={active.title} title={tag.title} color={tag.color}>
            {tag.title}
          </TagTitle>
        </TagItem>
      ))}
    </Wrapper>
  )
}

TagList.propTypes = {
  tags: T.arrayOf(
    T.shape({
      color: T.string,
      title: T.string,
    })
  ).isRequired,
  active: T.shape({
    color: T.string,
    title: T.string,
  }),
  onSelect: T.func.isRequired,
  // https://www.npmjs.com/package/prop-types
}

TagList.defaultProps = {
  active: { title: '', color: '' },
}

export default TagList
