/*
 *
 * UserBrief
 *
 */
import React from 'react'
import T from 'prop-types'
import Link from 'next/link'

import { DEFAULT_USER_AVATAR } from '@config'

import { buildLog } from '@utils'
import {
  Wrapper,
  AvatarWrapper,
  Avatar,
  BriefTextWrapper,
  UserTitle,
  UserDesc,
  SocialSpliter,
} from './styles'

import SocialIcons from './SocialIcons'
import BadgeInfo from './BadgeInfo'
import DetailView from './DetailView'
import DigestView from './DigestView'
import Operators from './Operators'

/* eslint-disable no-unused-vars */
const debug = buildLog('c:UserBrief')
/* eslint-enable no-unused-vars */

class UserBrief extends React.Component {
  constructor(props) {
    super(props)

    this.state = { showDetail: false }
  }

  toggleDetail() {
    this.setState(prevState => ({
      showDetail: !prevState.showDetail,
    }))
  }

  render() {
    const { showDetail } = this.state
    const {
      user,
      displayStyle,
      showEdit,
      onEdit,
      onLogout,
      viewingType,
    } = this.props

    return (
      <Wrapper>
        <AvatarWrapper>
          <Link href={`/user/${user.login}`}>
            <div>
              <Avatar
                src={user.avatar || DEFAULT_USER_AVATAR}
                displayStyle={displayStyle}
                hover={displayStyle === 'sidebar'}
              />
            </div>
          </Link>

          {displayStyle === 'sidebar' ? <BadgeInfo user={user} /> : null}
        </AvatarWrapper>

        <BriefTextWrapper>
          <UserTitle>
            {user.nickname}
            {viewingType === 'account' ? (
              <Operators show={showEdit} onEdit={onEdit} onLogout={onLogout} />
            ) : null}
          </UserTitle>

          {showDetail ? (
            <DetailView
              user={user}
              toggleDetail={this.toggleDetail.bind(this)}
            />
          ) : (
            <DigestView
              user={user}
              toggleDetail={this.toggleDetail.bind(this)}
            />
          )}
          <SocialSpliter />
          <UserDesc>
            <SocialIcons user={user} />
          </UserDesc>
        </BriefTextWrapper>
      </Wrapper>
    )
  }
}

UserBrief.propTypes = {
  user: T.object.isRequired,
  displayStyle: T.oneOf(['default', 'sidebar']),
  viewingType: T.oneOf(['account', 'user']),
  showEdit: T.bool,
  onEdit: T.func,
  onLogout: T.func,
}

UserBrief.defaultProps = {
  showEdit: false,
  displayStyle: 'default',
  viewingType: 'user',
  onEdit: debug,
  onLogout: debug,
}

export default UserBrief
