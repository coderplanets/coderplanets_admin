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

const MenuChildren = ({ activeCommunityId, curCommunityId, activePart }) => {
  return (
    <ChildrenWrapper
      activeCommunityId={activeCommunityId}
      curCommunityId={curCommunityId}
    >
      <ChildrenItem
        active={ROUTE.REGISTERS === activePart}
        onClick={logic.onChildMenuChange.bind(this, ROUTE.REGISTERS)}
      >
        <Link href="/communities">
          <ChildrenItemInner>
            <ChildrenTitle>注册用户</ChildrenTitle>
            <ChildrenNum>23</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
      <ChildrenItem
        active={ROUTE.PAYS === activePart}
        onClick={logic.onChildMenuChange.bind(this, ROUTE.PAYS)}
      >
        <Link href="/communities">
          <ChildrenItemInner>
            <ChildrenTitle>衣食父母</ChildrenTitle>
            <ChildrenNum>22</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
      <ChildrenItem
        active={ROUTE.PASSPORTS === activePart}
        onClick={logic.onChildMenuChange.bind(this, ROUTE.PASSPORTS)}
      >
        <Link href="/communities">
          <ChildrenItemInner>
            <ChildrenTitle>权限</ChildrenTitle>
            <ChildrenNum>22</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
      <ChildrenItem
        active={ROUTE.ROLES === activePart}
        onClick={logic.onChildMenuChange.bind(this, ROUTE.ROLES)}
      >
        <Link href="/communities">
          <ChildrenItemInner>
            <ChildrenTitle>角色</ChildrenTitle>
            <ChildrenNum>445</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
    </ChildrenWrapper>
  )
}

const UsersItemBar = ({ activeCommunityId, curCommunityId }) => {
  //   <Link href={item.target.href} as={item.target.as}>
  return (
    <MenuItemEach>
      <div>
        <MenuRow
          activeCommunityId={activeCommunityId}
          curCommunityId={curCommunityId}
          onClick={logic.extendMenuBar.bind(this, ROUTE.USERS_ID)}
        >
          <MenuCommunitiesIcon path={`${ICON_ASSETS}/cmd/users.svg`} />
          <div style={{ marginRight: 10 }} />
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <MenuTitle>所有用户</MenuTitle>
        </MenuRow>
      </div>
    </MenuItemEach>
  )
}

const UsersRootMenuItem = ({ activeCommunityId, activePart }) => (
  <MenuItemWrapper>
    <div>
      <UsersItemBar
        activeCommunityId={activeCommunityId}
        curCommunityId={ROUTE.USERS_ID}
      />
      <MenuChildren
        activeCommunityId={activeCommunityId}
        curCommunityId={ROUTE.USERS_ID}
        activePart={activePart}
      />
    </div>
  </MenuItemWrapper>
)

export default UsersRootMenuItem
