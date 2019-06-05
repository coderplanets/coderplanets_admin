/*
 *
 * TagsCell
 *
 */

import React from 'react'
import T from 'prop-types'
import R from 'ramda'

import { ICON_CMD } from '@config'

// import { inject, observer } from 'mobx-react'
// import Link from 'next/link'
import TagsList from './TagsList'
import AdderCell from '../AdderCell'

import { Wrapper, AddIcon } from './styles'

const TagsCell = ({ thread, source, onDelete, onAdd }) => (
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

export default TagsCell

TagsCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  /* communityId: T.number.isRequired, */
  source: T.object.isRequired,
  thread: T.string,
  onDelete: T.func.isRequired,
  onAdd: T.func.isRequired,
}

TagsCell.defaultProps = {
  thread: 'POST',
}
