/*
 *
 * TagsCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import shortid from 'shortid'

import { ICON_ASSETS } from '../../config'

// import { inject, observer } from 'mobx-react'
// import Link from 'next/link'
import {
  Wrapper,
  CategoryWrapper,
  CategoryTag,
  AddWrapper,
  DeleteCross,
  AddIcon,
  AddText,
} from './styles'

const TagsList = ({ tags, partId, onDelete }) => (
  <CategoryWrapper>
    {tags.map(c => (
      <CategoryTag
        key={shortid.generate()}
        onClick={onDelete.bind(this, partId, c)}
      >
        {c.title}
        <DeleteCross>x</DeleteCross>
      </CategoryTag>
    ))}
  </CategoryWrapper>
)

class TagsCell extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { tags, partId, onDelete, onAdd } = this.props

    return (
      <React.Fragment>
        {R.isEmpty(tags) ? (
          <AddWrapper>
            <AddIcon src={`${ICON_ASSETS}/cmd/plus.svg`} />
            <AddText onClick={onAdd.bind(this, partId, [])}>添加</AddText>
          </AddWrapper>
        ) : (
          <Wrapper>
            <TagsList tags={tags} partId={partId} onDelete={onDelete} />
            <div onClick={onAdd.bind(this, partId, tags)}>
              <AddIcon src={`${ICON_ASSETS}/cmd/plus.svg`} />
            </div>
          </Wrapper>
        )}
      </React.Fragment>
    )
  }
}

export default TagsCell

TagsCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  /* communityId: PropTypes.number.isRequired, */
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      color: PropTypes.string,
    })
  ),
  partId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
}

TagsCell.defaultProps = {
  tags: [],
}
