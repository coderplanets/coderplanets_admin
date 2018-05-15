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
        active={ROUTE.COMMUNITIES === activePart}
        onClick={logic.onChildMenuChange.bind(this, ROUTE.COMMUNITIES)}
      >
        <Link href="/communities">
          <ChildrenItemInner>
            <ChildrenTitle>社区</ChildrenTitle>
            <ChildrenNum>23</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
      <ChildrenItem
        active={ROUTE.CATEGORIES === activePart}
        onClick={logic.onChildMenuChange.bind(this, ROUTE.CATEGORIES)}
      >
        <Link href="/communities" as="/communities/categories">
          <ChildrenItemInner>
            <ChildrenTitle>分类</ChildrenTitle>
            <ChildrenNum>22</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
      <ChildrenItem
        active={ROUTE.EDITORS === activePart}
        onClick={logic.onChildMenuChange.bind(this, ROUTE.EDITORS)}
      >
        <Link href="/communities" as="/communities/editors">
          <ChildrenItemInner>
            <ChildrenTitle>编辑</ChildrenTitle>
            <ChildrenNum>22</ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>
      <ChildrenItem
        active={ROUTE.POSTS === activePart}
        onClick={logic.onChildMenuChange.bind(this, ROUTE.POSTS)}
      >
        <Link href="/communities" as="/communities/posts">
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
          onClick={logic.extendMenuBar.bind(this, ROUTE.COMMUNITIES_ID)}
        >
          <MenuCommunitiesIcon path={`${ICON_ASSETS}/cmd/all.svg`} />
          <div style={{ marginRight: 10 }} />
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <MenuTitle>所有社区</MenuTitle>
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
        curCommunityId={ROUTE.COMMUNITIES_ID}
      />
      <MenuChildren
        activeCommunityId={activeCommunityId}
        curCommunityId={ROUTE.COMMUNITIES_ID}
        activePart={activePart}
      />
    </div>
  </MenuItemWrapper>
)

export default CommunitiesRootMenuItem
