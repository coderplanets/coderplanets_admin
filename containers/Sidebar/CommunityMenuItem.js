import React from 'react'
// import Link from 'next/link'

import { ICON_CMD } from '@config'

import { cutFrom, ROUTE } from '@utils'
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

import * as logic from './logic'

const MenuItemBar = ({ item, activeRaw, curRaw }) => (
  <MenuItemEach>
    <div>
      <MenuRow
        active={activeRaw === curRaw}
        onClick={logic.extendMenuBar.bind(this, item.raw)}
      >
        <MenuItemIcon src={item.logo} />
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <div style={{ marginRight: 10 }} />
        <MenuTitle>{cutFrom(item.title, 10)}</MenuTitle>
      </MenuRow>
    </div>
  </MenuItemEach>
)

const MenuChildren = ({ community, activeRaw, activeThread, curRaw }) => (
  <ChildrenWrapper active={activeRaw === curRaw}>
    <ChildrenItem
      active={ROUTE.COMMUNITY === activeThread}
      onClick={console.log}
    >
      <ChildrenItemInner>
        <ChildrenTitle>综合设置</ChildrenTitle>
        <ChildrenNum>
          <SettingIcon src={`${ICON_CMD}/extra_setting.svg`} />
        </ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>

    <ChildrenItem
      onClick={logic.onRootMenuSelect.bind(this, curRaw, ROUTE.POSTS)}
      active={ROUTE.POSTS === activeThread}
    >
      <ChildrenItemInner>
        <ChildrenTitle>帖子</ChildrenTitle>
        <ChildrenNum>{community.postsCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      onClick={logic.onRootMenuSelect.bind(this, curRaw, ROUTE.JOBS)}
      active={ROUTE.JOBS === activeThread}
    >
      <ChildrenItemInner>
        <ChildrenTitle>招聘</ChildrenTitle>
        <ChildrenNum>{community.jobsCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      onClick={logic.onRootMenuSelect.bind(this, curRaw, ROUTE.VIDEOS)}
      active={ROUTE.VIDEOS === activeThread}
    >
      <ChildrenItemInner>
        <ChildrenTitle>视频</ChildrenTitle>
        <ChildrenNum>{community.videosCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      onClick={logic.onRootMenuSelect.bind(this, curRaw, ROUTE.REPOS)}
      active={ROUTE.REPOS === activeThread}
    >
      <ChildrenItemInner>
        <ChildrenTitle>开源项目</ChildrenTitle>
        <ChildrenNum>{community.reposCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      onClick={logic.onRootMenuSelect.bind(this, curRaw, ROUTE.EDITORS)}
      active={ROUTE.EDITORS === activeThread}
    >
      <ChildrenItemInner>
        <ChildrenTitle>编辑</ChildrenTitle>
        <ChildrenNum>{community.editorsCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      onClick={logic.onRootMenuSelect.bind(this, curRaw, ROUTE.THREADS)}
      active={ROUTE.THREADS === activeThread}
    >
      <ChildrenItemInner>
        <ChildrenTitle>threads</ChildrenTitle>
        <ChildrenNum>{community.threadsCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      onClick={logic.onRootMenuSelect.bind(this, curRaw, ROUTE.TAGS)}
      active={ROUTE.TAGS === activeThread}
    >
      <ChildrenItemInner>
        <ChildrenTitle>标签</ChildrenTitle>
        <ChildrenNum>{community.tagsCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      onClick={logic.onRootMenuSelect.bind(this, curRaw, ROUTE.SUBSCRIBERS)}
      active={ROUTE.SUBSCRIBERS === activeThread}
    >
      <ChildrenItemInner>
        <ChildrenTitle>订阅用户</ChildrenTitle>
        <ChildrenNum>{community.subscribersCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
  </ChildrenWrapper>
)

const CommunityMenuItem = ({ community, item, activeRaw, activeThread }) => {
  return (
    <MenuItemWrapper>
      <MenuItemBar item={item} activeRaw={activeRaw} curRaw={item.raw} />
      <MenuChildren
        community={community}
        activeRaw={activeRaw}
        activeThread={activeThread}
        curRaw={item.raw}
      />
    </MenuItemWrapper>
  )
}

export default CommunityMenuItem
