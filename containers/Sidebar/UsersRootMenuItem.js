import React from 'react'

import { ICON_CMD } from '../../config'

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

import { ROUTE } from '../../utils'
import * as logic from './logic'

const MenuChildren = ({ activeRaw, curRaw, activeThread }) => (
  <ChildrenWrapper active={activeRaw === curRaw}>
    <ChildrenItem
      active={ROUTE.USERS === activeThread || activeThread === 'index'}
      onClick={logic.onRootMenuSelect.bind(this, 'users', 'index')}
    >
      <ChildrenItemInner>
        <ChildrenTitle>注册用户</ChildrenTitle>
        <ChildrenNum>--</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      active={ROUTE.SENIOR === activeThread}
      onClick={logic.onRootMenuSelect.bind(this, 'users', ROUTE.SENIOR)}
    >
      <ChildrenItemInner>
        <ChildrenTitle>高级用户</ChildrenTitle>
        <ChildrenNum>--</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
  </ChildrenWrapper>
)

const UsersItemBar = ({ activeRaw, curRaw }) => (
  //   <Link href={item.target.href} as={item.target.as}>
  <MenuItemEach>
    <div>
      <MenuRow
        active={activeRaw === curRaw}
        onClick={logic.extendMenuBar.bind(this, ROUTE.USERS)}
      >
        <MenuCommunitiesIcon src={`${ICON_CMD}/users.svg`} />
        <div style={{ marginRight: 10 }} />
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <MenuTitle>所有用户</MenuTitle>
      </MenuRow>
    </div>
  </MenuItemEach>
)

const UsersRootMenuItem = ({ activeRaw, activeThread }) => (
  <MenuItemWrapper>
    <UsersItemBar activeRaw={activeRaw} curRaw={ROUTE.USERS} />
    <MenuChildren
      activeRaw={activeRaw}
      curRaw={ROUTE.USERS}
      activeThread={activeThread}
    />
  </MenuItemWrapper>
)

export default UsersRootMenuItem
