/*
 *
 * TagsCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'

import { ICON_CMD } from '../../config'

// import { inject, observer } from 'mobx-react'
// import Link from 'next/link'
import { AdderCell } from '../../components'

import {
  Wrapper,
  ListWrapper,
  TagWrapper,
  DeleteCross,
  AddIcon,
} from './styles'

import { uid } from '../../utils'

const TagsList = ({ source, onDelete }) => (
  <ListWrapper>
    {source.tags.map(c => (
      <TagWrapper key={uid.gen()} onClick={onDelete.bind(this, source.id, c)}>
        {c.title}
        <DeleteCross>x</DeleteCross>
      </TagWrapper>
    ))}
  </ListWrapper>
)

class TagsCell extends React.Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { thread, source, onDelete, onAdd } = this.props

    return (
      <React.Fragment>
        {R.isEmpty(source.tags) ? (
          <AdderCell onAdd={onAdd.bind(this, thread, source)} />
        ) : (
          <Wrapper>
            <TagsList source={source} onDelete={onDelete} />
            <div onClick={onAdd.bind(this, thread, source)}>
              <AddIcon src={`${ICON_CMD}/plus.svg`} />
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
  thread: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
}

TagsCell.defaultProps = {
  thread: 'POST',
}
