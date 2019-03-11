/*
 *
 * UserCell
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { makeDebugger, cutFrom } from 'utils'
import { UserCellWrapper, Avatar, NickName } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('c:UserCell:index')
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
  user: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    nickname: PropTypes.string,
  }).isRequired,
  align: PropTypes.string,
  left: PropTypes.string,
  small: PropTypes.bool,
}

UserCell.defaultProps = {
  align: 'left',
  left: '10px',
  small: false,
}

export default UserCell
