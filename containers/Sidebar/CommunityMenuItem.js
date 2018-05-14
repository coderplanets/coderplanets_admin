import React from 'react'
import Link from 'next/link'

import { ICON_ASSETS } from '../../config'

import { cutFrom, ROUTE } from '../../utils'
import * as logic from './logic'

import {
  MenuRow,
  MenuTitle,
  MenuItemWrapper,
  MenuItemEach,
  MenuItemIcon,
  ChildrenWrapper,
  ChildrenItem,
  ChildrenItemInner,
  ChildrenTitle,
  ChildrenNum,
  SettingIcon,
} from './styles/menu'

const MenuItemBar = ({ item, activeCommunityId, curCommunityId }) => {
  //   <Link href={item.target.href} as={item.target.as}>
  return (
    <MenuItemEach>
      <div>
        <MenuRow
          activeCommunityId={activeCommunityId}
          curCommunityId={curCommunityId}
          onClick={logic.extendMenuBar.bind(this, item.id)}
        >
          <MenuItemIcon path={item.logo} />
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <div style={{ marginRight: 10 }} />
          <MenuTitle>{cutFrom(item.title, 10)}</MenuTitle>
        </MenuRow>
      </div>
    </MenuItemEach>
  )
}

const MenuChildren = ({ activeCommunityId, curCommunityId, activePart }) => {
  return (
    <ChildrenWrapper
      activeCommunityId={activeCommunityId}
      curCommunityId={curCommunityId}
    >
      <ChildrenItem
        active={ROUTE.COMMUNITY === activePart}
        onClick={logic.onChildMenuChange.bind(this, ROUTE.COMMUNITY)}
      >
        <Link href="/">
          <ChildrenItemInner>
            <ChildrenTitle>综合设置</ChildrenTitle>
            <ChildrenNum>
              <SettingIcon path={`${ICON_ASSETS}/cmd/extra_setting.svg`} />
            </ChildrenNum>
          </ChildrenItemInner>
        </Link>
      </ChildrenItem>

      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, ROUTE.POSTS)}
        active={ROUTE.POSTS === activePart}
      >
        <ChildrenTitle>帖子</ChildrenTitle>
        <ChildrenNum>20</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, ROUTE.JOBS)}
        active={ROUTE.JOBS === activePart}
      >
        <ChildrenTitle>招聘</ChildrenTitle>
        <ChildrenNum>18</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, ROUTE.ACTIVITIES)}
        active={ROUTE.ACTIVITIES === activePart}
      >
        <ChildrenTitle>活动</ChildrenTitle>
        <ChildrenNum>18</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, ROUTE.CHEATSHEETS)}
        active={ROUTE.CHEATSHEETS === activePart}
      >
        <ChildrenTitle>Cheatsheets</ChildrenTitle>
        <ChildrenNum>18</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, ROUTE.EDITORS)}
        active={ROUTE.EDITORS === activePart}
      >
        <ChildrenTitle>编辑</ChildrenTitle>
        <ChildrenNum>3</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, ROUTE.THREADS)}
        active={ROUTE.THREADS === activePart}
      >
        <ChildrenTitle>threads</ChildrenTitle>
        <ChildrenNum>13</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, ROUTE.TAGS)}
        active={ROUTE.TAGS === activePart}
      >
        <ChildrenTitle>标签(part)</ChildrenTitle>
        <ChildrenNum>13</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, ROUTE.SUBSCRIBERS)}
        active={ROUTE.SUBSCRIBERS === activePart}
      >
        <ChildrenTitle>订阅用户</ChildrenTitle>
        <ChildrenNum>2</ChildrenNum>
      </ChildrenItem>
    </ChildrenWrapper>
  )
}
const CommunityMenuItem = ({ item, activeCommunityId, activePart }) => (
  <MenuItemWrapper>
    <div>
      <MenuItemBar
        item={item}
        activeCommunityId={activeCommunityId}
        curCommunityId={item.id}
      />
      <MenuChildren
        activeCommunityId={activeCommunityId}
        curCommunityId={item.id}
        activePart={activePart}
      />
    </div>
  </MenuItemWrapper>
)

export default CommunityMenuItem
