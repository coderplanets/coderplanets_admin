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
        <ChildrenNum>23</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      active={ROUTE.PAYS === activeThread}
      onClick={logic.onRootMenuSelect.bind(this, 'users', 'pays')}
    >
      <ChildrenItemInner>
        <ChildrenTitle>衣食父母</ChildrenTitle>
        <ChildrenNum>22</ChildrenNum>
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
        onClick={logic.extendMenuBar.bind(this, ROUTE.USERS_RAW)}
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
    <div>
      <UsersItemBar activeRaw={activeRaw} curRaw={ROUTE.USERS_RAW} />
      <MenuChildren
        activeRaw={activeRaw}
        curRaw={ROUTE.USERS_RAW}
        activeThread={activeThread}
      />
    </div>
  </MenuItemWrapper>
)

export default UsersRootMenuItem
