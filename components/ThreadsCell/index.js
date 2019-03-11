/*
 *
 * ThreadsCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import { Icon } from 'antd'

import { ICON_CMD } from 'config'

import { uid, makeDebugger, Trans } from 'utils'
import AdderCell from '../AdderCell'

import { Wrapper, Thread, DeleteCross, AddIcon } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:ThreadsCell:index')
/* eslint-enable no-unused-vars */

const ThreadsCell = ({ data, source, onDelete, onAdd }) => (
  <Wrapper>
    {data.map(t => (
      <Thread key={uid.gen()}>
        {Trans(t.raw)}
        <DeleteCross onClick={onDelete.bind(this, source.id, t)}>
          <Icon type="cross" />
        </DeleteCross>
      </Thread>
    ))}

    <React.Fragment>
      {R.isEmpty(data) ? (
        <AdderCell onAdd={onAdd.bind(this, source)} />
      ) : (
        <div onClick={onAdd.bind(this, source)}>
          <AddIcon src={`${ICON_CMD}/plus.svg`} />
        </div>
      )}
    </React.Fragment>
  </Wrapper>
)

ThreadsCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  source: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      raw: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
}

ThreadsCell.defaultProps = {
  onDelete: debug,
  onAdd: debug,
}

export default ThreadsCell
