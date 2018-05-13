import React from 'react'
import Link from 'next/link'

import { ICON_ASSETS } from '../../config'

import { cutFrom, TYPE } from '../../utils'
import * as logic from './logic'

import {
  MenuRow,
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
          <a style={{ textDecoration: 'none' }}>{cutFrom(item.title, 10)}</a>
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
        active={TYPE.C_UTILS === activePart}
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_UTILS)}
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
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_POSTS)}
        active={TYPE.C_POSTS === activePart}
      >
        <ChildrenTitle>帖子</ChildrenTitle>
        <ChildrenNum>20</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_JOBS)}
        active={TYPE.C_JOBS === activePart}
      >
        <ChildrenTitle>招聘</ChildrenTitle>
        <ChildrenNum>18</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_ACTIVITIES)}
        active={TYPE.C_ACTIVITIES === activePart}
      >
        <ChildrenTitle>活动</ChildrenTitle>
        <ChildrenNum>18</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_CHEATSHEETS)}
        active={TYPE.C_CHEATSHEETS === activePart}
      >
        <ChildrenTitle>Cheatsheets</ChildrenTitle>
        <ChildrenNum>18</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_EDITORS)}
        active={TYPE.C_EDITORS === activePart}
      >
        <ChildrenTitle>编辑</ChildrenTitle>
        <ChildrenNum>3</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_THREADS)}
        active={TYPE.C_THREADS === activePart}
      >
        <ChildrenTitle>threads</ChildrenTitle>
        <ChildrenNum>13</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_TAGS)}
        active={TYPE.C_TAGS === activePart}
      >
        <ChildrenTitle>标签(part)</ChildrenTitle>
        <ChildrenNum>13</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_SUBSCRIBERS)}
        active={TYPE.C_SUBSCRIBERS === activePart}
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
