/*
 *
 * AvatarsRow
 *
 */

import React from 'react'
import T from 'prop-types'
import R from 'ramda'
import { Tooltip } from 'antd'

import { ATATARS_LIST_LENGTH } from 'config/general'

import { buildLog, prettyNum } from '@utils'
import { Avatars, AvatarsItem, AvatarsImg, AvatarsMore } from './styles'

/* eslint-disable no-unused-vars */
const log = buildLog('c:AvatarsRow:index')
/* eslint-enable no-unused-vars */

const validUser = R.compose(
  R.not,
  R.isNil
)

const AvatarsRow = ({
  users,
  total,
  height,
  limit,
  onUserSelect,
  onTotalSelect,
}) => {
  if (users.length === 0) {
    return <span />
  }

  users = R.filter(validUser, users)

  return (
    <Avatars height={height}>
      {total <= 1 ? (
        <span />
      ) : (
        <AvatarsItem onClick={onTotalSelect.bind(this, { users, total })}>
          <Tooltip title={`所有评论共 ${total} 条`}>
            <AvatarsMore total={total}>{prettyNum(total)}</AvatarsMore>
          </Tooltip>
        </AvatarsItem>
      )}

      {R.slice(0, limit, users).map(user => (
        <AvatarsItem key={user.id} onClick={onUserSelect.bind(this, user)}>
          <Tooltip title={user.nickname}>
            <AvatarsImg src={user.avatar} />
          </Tooltip>
        </AvatarsItem>
      ))}
    </Avatars>
  )
}

AvatarsRow.propTypes = {
  users: T.arrayOf(
    T.shape({
      id: T.string,
      avatar: T.string,
      nickname: T.string,
      extra_id: T.string,
    })
  ),
  total: T.number.isRequired,
  height: T.string,
  limit: T.number,
  onUserSelect: T.func,
  onTotalSelect: T.func,
}

AvatarsRow.defaultProps = {
  height: '32px',
  users: [],
  limit: ATATARS_LIST_LENGTH.POSTS,
  onUserSelect: log,
  onTotalSelect: log,
}

export default AvatarsRow
