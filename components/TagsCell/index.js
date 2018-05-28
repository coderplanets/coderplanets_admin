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

const TagsList = ({ source, onDelete }) => (
  <CategoryWrapper>
    {source.tags.map(c => (
      <CategoryTag
        key={shortid.generate()}
        onClick={onDelete.bind(this, source.id, c)}
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
    const { source, onDelete, onAdd } = this.props

    return (
      <React.Fragment>
        {R.isEmpty(source.tags) ? (
          <AddWrapper>
            <AddIcon src={`${ICON_ASSETS}/cmd/plus.svg`} />
            <AddText onClick={onAdd.bind(this, source)}>添加</AddText>
          </AddWrapper>
        ) : (
          <Wrapper>
            <TagsList source={source} onDelete={onDelete} />
            <div onClick={onAdd.bind(this, source)}>
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
  source: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
}

TagsCell.defaultProps = {}
