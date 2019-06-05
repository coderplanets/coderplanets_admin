/*
 *
 * UserCell
 *
 */

import React from 'react'
import T from 'prop-types'

import { buildLog, cutFrom } from '@utils'
import { UserCellWrapper, Avatar, NickName } from './styles'

/* eslint-disable no-unused-vars */
const debug = buildLog('c:UserCell:index')
/* eslint-enable no-unused-vars */

const UserCell = ({ user, align, left, small }) => (
  <div>
    <UserCellWrapper align={align} left={left}>
      <Avatar src={user.avatar} alt={user.nickname} small={small} />
      <NickName>{cutFrom(user.nickname, 10)}</NickName>
    </UserCellWrapper>
  </div>
)

UserCell.propTypes = {
  // https://www.npmjs.com/package/prop-types
  user: T.shape({
    id: T.string,
    avatar: T.string,
    nickname: T.string,
  }).isRequired,
  align: T.string,
  left: T.string,
  small: T.bool,
}

UserCell.defaultProps = {
  align: 'left',
  left: '10px',
  small: false,
}

export default UserCell
