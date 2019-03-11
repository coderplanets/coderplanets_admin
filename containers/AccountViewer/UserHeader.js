import React from 'react'

import { A, Button, Icon } from 'components'
import { ICON_CMD } from 'config'

import { uid } from 'utils'
import {
  UserWrapper,
  UserInfo,
  UserBrief,
  UserName,
  BriefInfo,
  Avatar,
  UserHeader,
  SocalIcon,
  EditIcon,
} from './styles/user_header'

const tooltipOffset = JSON.stringify({ top: 5, left: 3 })
const SocalIcons = ({ accountInfo: { githubProfile } }) => (
  <BriefInfo>
    <div
      key={uid.gen()}
      data-tip="站内主页"
      data-offset={tooltipOffset}
      data-delay-show="500"
    >
      <SocalIcon src={`${ICON_CMD}/home.svg`} />
    </div>

    {githubProfile ? (
      <A href={githubProfile.htmlUrl}>
        <div
          key={uid.gen()}
          data-tip={githubProfile.htmlUrl}
          data-offset={tooltipOffset}
          data-delay-show="500"
        >
          <SocalIcon src={`${ICON_CMD}/github.svg`} />
        </div>
      </A>
    ) : (
      <div />
    )}
  </BriefInfo>
)

const UserHeaderSection = ({ accountInfo, logout, editProfile }) => (
  <UserWrapper>
    <UserHeader>
      <UserInfo>
        {/* Avatar should be a link to accout's home */}
        <Avatar src={accountInfo.avatar} alt="user_avatar" />
        <UserBrief>
          <UserName>
            {accountInfo.nickname}
            {/* eslint-disable */}
            <div onClick={editProfile}>
              <EditIcon src={`${ICON_CMD}/edit.svg`} />
            </div>
            {/* eslint-enable */}
          </UserName>
          <BriefInfo>教育经历:&nbsp; 成都信息工程学院</BriefInfo>
          <BriefInfo>bio:&nbsp; {accountInfo.bio}</BriefInfo>
          <BriefInfo>所在地区:&nbsp; 成都</BriefInfo>
          <SocalIcons accountInfo={accountInfo} />
        </UserBrief>
      </UserInfo>

      <div>
        <Button size="small" type="primary" ghost onClick={logout}>
          <Icon type="logout" />
          登&nbsp;出
        </Button>
      </div>
    </UserHeader>
  </UserWrapper>
)

export default UserHeaderSection
