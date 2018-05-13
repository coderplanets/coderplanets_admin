import React from 'react'
import Link from 'next/link'

import { TYPE } from '../../utils'
import { ICON_ASSETS } from '../../config'

import {
  MenuRow,
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
        active={TYPE.U_R_REGISTER === activePart}
        onClick={logic.onChildMenuChange.bind(this, TYPE.U_R_REGISTER)}
      >
        <Link href="/communities">
          <ChildrenItemInner>
            <ChildrenTitle>注册用户</ChildrenTitle>
            <ChildrenNum>23</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
      <ChildrenItem
        active={TYPE.U_R_PAYS === activePart}
        onClick={logic.onChildMenuChange.bind(this, TYPE.U_R_PAYS)}
      >
        <Link href="/communities">
          <ChildrenItemInner>
            <ChildrenTitle>衣食父母</ChildrenTitle>
            <ChildrenNum>22</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
      <ChildrenItem
        active={TYPE.U_R_PASSPORTS === activePart}
        onClick={logic.onChildMenuChange.bind(this, TYPE.U_R_PASSPORTS)}
      >
        <Link href="/communities">
          <ChildrenItemInner>
            <ChildrenTitle>权限</ChildrenTitle>
            <ChildrenNum>22</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
      <ChildrenItem
        active={TYPE.U_R_ROLES === activePart}
        onClick={logic.onChildMenuChange.bind(this, TYPE.U_R_ROLES)}
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
          onClick={logic.extendMenuBar.bind(this, TYPE.C_USERS_ID)}
        >
          <MenuCommunitiesIcon path={`${ICON_ASSETS}/cmd/users.svg`} />
          <div style={{ marginRight: 10 }} />
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <a style={{ textDecoration: 'none' }}>所有用户</a>
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
        curCommunityId={TYPE.C_USERS_ID}
      />
      <MenuChildren
        activeCommunityId={activeCommunityId}
        curCommunityId={TYPE.C_USERS_ID}
        activePart={activePart}
      />
    </div>
  </MenuItemWrapper>
)

export default UsersRootMenuItem
