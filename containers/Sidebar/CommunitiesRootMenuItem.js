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
        active={TYPE.C_R_TOP === activePart}
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_R_TOP)}
      >
        <Link href="/communities">
          <ChildrenItemInner>
            <ChildrenTitle>社区</ChildrenTitle>
            <ChildrenNum>23</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
      <ChildrenItem
        active={TYPE.C_R_CATEGORIES === activePart}
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_R_CATEGORIES)}
      >
        <Link href="/communities">
          <ChildrenItemInner>
            <ChildrenTitle>分类</ChildrenTitle>
            <ChildrenNum>22</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
      <ChildrenItem
        active={TYPE.C_R_EDITORS === activePart}
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_R_EDITORS)}
      >
        <Link href="/communities">
          <ChildrenItemInner>
            <ChildrenTitle>编辑</ChildrenTitle>
            <ChildrenNum>22</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
      <ChildrenItem
        active={TYPE.C_R_POSTS === activePart}
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_R_POSTS)}
      >
        <Link href="/communities">
          <ChildrenItemInner>
            <ChildrenTitle>帖子</ChildrenTitle>
            <ChildrenNum>445</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
    </ChildrenWrapper>
  )
}

const CommunitiesItemBar = ({ activeCommunityId, curCommunityId }) => {
  //   <Link href={item.target.href} as={item.target.as}>
  return (
    <MenuItemEach>
      <div>
        <MenuRow
          activeCommunityId={activeCommunityId}
          curCommunityId={curCommunityId}
          onClick={logic.extendMenuBar.bind(this, TYPE.C_COMMUNITIES_ID)}
        >
          <MenuCommunitiesIcon path={`${ICON_ASSETS}/cmd/all.svg`} />
          <div style={{ marginRight: 10 }} />
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <a style={{ textDecoration: 'none' }}>所有社区</a>
        </MenuRow>
      </div>
    </MenuItemEach>
  )
}

const CommunitiesRootMenuItem = ({ activeCommunityId, activePart }) => (
  <MenuItemWrapper>
    <div>
      <CommunitiesItemBar
        activeCommunityId={activeCommunityId}
        curCommunityId={TYPE.C_COMMUNITIES_ID}
      />
      <MenuChildren
        activeCommunityId={activeCommunityId}
        curCommunityId={TYPE.C_COMMUNITIES_ID}
        activePart={activePart}
      />
    </div>
  </MenuItemWrapper>
)

export default CommunitiesRootMenuItem
