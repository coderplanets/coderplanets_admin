/*
 *
 * Header
 *
 */

import React from 'react'
import R from 'ramda'
import { inject, observer } from 'mobx-react'
import keydown from 'react-keydown'

import { ICON_CMD, ICON_ASSETS } from '../../config/assets'
import { Affix } from '../../components'

import { makeDebugger, storePlug, TYPE } from '../../utils'

import {
  HeaderWrapper,
  RouterWrapper,
  MiniMapWrapper,
  CommunityLogo,
  SettingLogo,
  MiniMapTitle,
  MiniMapDivider,
  Admin,
  Search,
  Notification,
  HeaderIcon,
  UserAvatar,
  StateIcon,
  StateButton,
  DividerIcon,
  SubRoute,
  Operations,
  User,
  AffixHeader,
  RawHeader,
} from './styles'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:Header')
/* eslint-enable no-unused-vars */

const I18Dict = {
  posts: '帖子',
  categories: '类别',
  tags: '标签',
  editors: '编辑',
  subscribers: '订阅用户',
  pays: '衣食父母',
  users: '注册用户',
  passports: '权限',
  roles: '角色',
}

const translate = key => {
  if (R.has(key, I18Dict)) return I18Dict[key]
  return key
}

const SubRouteContent = ({ subPath }) => {
  if (subPath) {
    return (
      <SubRoute>
        <MiniMapDivider />
        <MiniMapTitle>{translate(subPath)}</MiniMapTitle>
      </SubRoute>
    )
  }
  return <div />
}

const MiniMap = ({ curRoute }) => {
  const defaultIcon = 'js'
  const { mainPath, subPath } = curRoute
  const iconKey = mainPath.length > 1 ? mainPath : defaultIcon

  switch (mainPath) {
    case 'communities': {
      return (
        <MiniMapWrapper>
          <SettingLogo src={`${ICON_CMD}/all.svg`} />
          <MiniMapDivider />
          <MiniMapTitle>社区设置</MiniMapTitle>
          <SubRouteContent subPath={subPath} />
        </MiniMapWrapper>
      )
    }
    case 'users': {
      return (
        <MiniMapWrapper>
          <SettingLogo src={`${ICON_CMD}/users.svg`} />
          <MiniMapDivider />
          <MiniMapTitle>用户设置</MiniMapTitle>
          <SubRouteContent subPath={subPath} />
        </MiniMapWrapper>
      )
    }
    default: {
      return (
        <MiniMapWrapper>
          <CommunityLogo src={`${ICON_ASSETS}/pl/${iconKey}.svg`} />
          <MiniMapDivider />
          <MiniMapTitle>{mainPath}</MiniMapTitle>
          <SubRouteContent subPath={subPath} />
        </MiniMapWrapper>
      )
    }
  }
}

// {fixed ? <MiniMap curRoute={curRoute} /> : <Navigator />}
const Header = ({ curRoute, leftOffset, fixed, isLogin, accountInfo }) => (
  <HeaderWrapper
    id="whereCallShowDoraemon"
    leftOffset={leftOffset}
    fixed={fixed}
  >
    <RouterWrapper>
      <MiniMap curRoute={curRoute} />
    </RouterWrapper>
    <Admin>
      <div style={{ display: 'flex' }}>
        <StateButton
          size="small"
          type="primary"
          ghost
          onClick={logic.previewState.bind(this, 'mst-state')}
        >
          <StateIcon src={`${ICON_CMD}/header_state.svg`} />
          <div>STATE</div>
        </StateButton>

        <DividerIcon src={`${ICON_CMD}/more.svg`} />
      </div>
    </Admin>

    <Operations>
      <Search onClick={logic.openDoraemon}>
        <HeaderIcon src={`${ICON_CMD}/search2.svg`} />
      </Search>
      <Notification onClick={logic.openPreview.bind(this, 'post')}>
        <HeaderIcon src={`${ICON_CMD}/notification_none.svg`} />
      </Notification>

      {isLogin ? (
        <User onClick={logic.previewAccount.bind(this, 'account')}>
          <UserAvatar src={accountInfo.avatar} />
        </User>
      ) : (
        <User onClick={logic.login}>
          <HeaderIcon src={`${ICON_CMD}/header_user.svg`} />
        </User>
      )}
    </Operations>
  </HeaderWrapper>
)

class HeaderContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.header)
  }

  /* eslint-disable class-methods-use-this */
  @keydown(['ctrl+p'])
  openDoraemon() {
    // debug('openDoraemon')
    logic.openDoraemon()
  }
  /* eslint-enable class-methods-use-this */

  render() {
    const {
      fixed,
      curRoute,
      leftOffset,
      accountInfo,
      isLogin,
    } = this.props.header

    // <Affix style={{ display: fixed ? 'block' : 'none' }}>
    return (
      <div id={TYPE.APP_HEADER_ID}>
        <AffixHeader fixed={fixed}>
          <Affix>
            <Header
              fixed={fixed}
              curRoute={curRoute}
              leftOffset={leftOffset}
              accountInfo={accountInfo}
              isLogin={isLogin}
            />
          </Affix>
        </AffixHeader>
        <RawHeader fixed={fixed}>
          <Header
            fixed={fixed}
            curRoute={curRoute}
            leftOffset={leftOffset}
            accountInfo={accountInfo}
            isLogin={isLogin}
          />
        </RawHeader>
      </div>
    )
  }
}

export default inject(storePlug('header'))(observer(HeaderContainer))
