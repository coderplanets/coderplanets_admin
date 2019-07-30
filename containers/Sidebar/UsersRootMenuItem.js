import React from 'react'

import { ICON_CMD } from '@config'
import { ROUTE } from '@constant'

import {
  MenuRow,
  MenuTitle,
  MenuItemWrapper,
  MenuItemEach,
  MenuCommunitiesIcon,
  ChildrenWrapper,
  ChildrenItem,
  ChildrenItemInner,
  ChildrenTitle,
  ChildrenNum,
} from './styles/menu'

import * as logic from './logic'

const MenuChildren = ({ community, activeRaw, curRaw, activeThread }) => (
  <ChildrenWrapper active={activeRaw === curRaw}>
    <ChildrenItem
      active={ROUTE.USERS === activeThread || activeThread === 'index'}
      onClick={logic.onRootMenuSelect.bind(this, ROUTE.USERS, 'index')}
    >
      <ChildrenItemInner>
        <ChildrenTitle>注册用户</ChildrenTitle>
        <ChildrenNum>{community.subscribersCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      active={ROUTE.SENIOR === activeThread}
      onClick={logic.onRootMenuSelect.bind(this, ROUTE.USERS, ROUTE.SENIOR)}
    >
      <ChildrenItemInner>
        <ChildrenTitle>高级用户</ChildrenTitle>
        <ChildrenNum>--</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
  </ChildrenWrapper>
)

const UsersItemBar = ({ activeRaw, curRaw }) => (
  <MenuItemEach>
    <MenuRow
      active={activeRaw === curRaw}
      onClick={logic.extendMenuBar.bind(this, ROUTE.USERS)}
    >
      <MenuCommunitiesIcon src={`${ICON_CMD}/users.svg`} />
      <div style={{ marginRight: 10 }} />
      {/* eslint-disable jsx-a11y/anchor-is-valid */}
      <MenuTitle>所有用户</MenuTitle>
    </MenuRow>
  </MenuItemEach>
)

const UsersRootMenuItem = ({ community, activeRaw, activeThread }) => (
  <MenuItemWrapper>
    <UsersItemBar activeRaw={activeRaw} curRaw={ROUTE.USERS} />
    <MenuChildren
      community={community}
      activeRaw={activeRaw}
      curRaw={ROUTE.USERS}
      activeThread={activeThread}
    />
  </MenuItemWrapper>
)

export default UsersRootMenuItem
