/*
 *
 * ThreadsCell
 *
 */

import React from 'react'
import T from 'prop-types'
import R from 'ramda'
import { Icon } from 'antd'

import { ICON_CMD } from '@config'

import { uid, buildLog, Trans } from '@utils'
import AdderCell from '../AdderCell'

import { Wrapper, Thread, DeleteCross, AddIcon } from './styles'

/* eslint-disable no-unused-vars */
const debug = buildLog('c:ThreadsCell:index')
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
  source: T.object.isRequired,
  data: T.arrayOf(
    T.shape({
      title: T.string,
      raw: T.string,
    })
  ).isRequired,
  onDelete: T.func,
  onAdd: T.func,
}

ThreadsCell.defaultProps = {
  onDelete: debug,
  onAdd: debug,
}

export default ThreadsCell
