import React from 'react'
import Link from 'next/link'

import { ROUTE } from '../../utils'
import { ICON_ASSETS } from '../../config'

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

const MenuChildren = ({ activeRaw, curRaw, activeThread }) => (
  <ChildrenWrapper active={activeRaw === curRaw}>
    <ChildrenItem active={ROUTE.USERS === activeThread}>
      <Link href="/users">
        <ChildrenItemInner>
          <ChildrenTitle>注册用户</ChildrenTitle>
          <ChildrenNum>23</ChildrenNum>
        </ChildrenItemInner>
      </Link>
    </ChildrenItem>
    <ChildrenItem active={ROUTE.PAYS === activeThread}>
      <Link href="/users" as="/users/pays">
        <ChildrenItemInner>
          <ChildrenTitle>衣食父母</ChildrenTitle>
          <ChildrenNum>22</ChildrenNum>
        </ChildrenItemInner>
      </Link>
    </ChildrenItem>
    <ChildrenItem active={ROUTE.PASSPORTS === activeThread}>
      <Link href="/users" as="/users/passports">
        <ChildrenItemInner>
          <ChildrenTitle>权限</ChildrenTitle>
          <ChildrenNum>22</ChildrenNum>
        </ChildrenItemInner>
      </Link>
    </ChildrenItem>
    <ChildrenItem active={ROUTE.ROLES === activeThread}>
      <Link href="/users" as="/users/roles">
        <ChildrenItemInner>
          <ChildrenTitle>角色</ChildrenTitle>
          <ChildrenNum>445</ChildrenNum>
        </ChildrenItemInner>
      </Link>
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
        <MenuCommunitiesIcon src={`${ICON_ASSETS}/cmd/users.svg`} />
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
