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

const MenuChildren = ({ activeRaw, curRaw, activeThread, countsInfo }) => (
  <ChildrenWrapper active={activeRaw === curRaw}>
    <ChildrenItem
      active={ROUTE.COMMUNITIES === activeThread || activeThread === 'index'}
      onClick={logic.onRootMenuSelect.bind(this, ROUTE.COMMUNITIES, 'index')}
    >
      <ChildrenItemInner>
        <ChildrenTitle>社区</ChildrenTitle>
        <ChildrenNum>{countsInfo.communitiesCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      active={ROUTE.CATEGORIES === activeThread}
      onClick={logic.onRootMenuSelect.bind(
        this,
        ROUTE.COMMUNITIES,
        ROUTE.CATEGORIES
      )}
    >
      <ChildrenItemInner>
        <ChildrenTitle>分类</ChildrenTitle>
        <ChildrenNum>{countsInfo.categoriesCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      active={ROUTE.TAGS === activeThread}
      onClick={logic.onRootMenuSelect.bind(this, ROUTE.COMMUNITIES, ROUTE.TAGS)}
    >
      <ChildrenItemInner>
        <ChildrenTitle>标签</ChildrenTitle>
        <ChildrenNum>{countsInfo.tagsCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      active={ROUTE.EDITORS === activeThread}
      onClick={logic.onRootMenuSelect.bind(
        this,
        ROUTE.COMMUNITIES,
        ROUTE.EDITORS
      )}
    >
      <ChildrenItemInner>
        <ChildrenTitle>编辑</ChildrenTitle>
        <ChildrenNum>--</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      active={ROUTE.THREADS === activeThread}
      onClick={logic.onRootMenuSelect.bind(
        this,
        ROUTE.COMMUNITIES,
        ROUTE.THREADS
      )}
    >
      <ChildrenItemInner>
        <ChildrenTitle>频道/版块</ChildrenTitle>
        <ChildrenNum>{countsInfo.threadsCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      active={ROUTE.POSTS === activeThread}
      onClick={logic.onRootMenuSelect.bind(
        this,
        ROUTE.COMMUNITIES,
        ROUTE.POSTS
      )}
    >
      <ChildrenItemInner>
        <ChildrenTitle>帖子</ChildrenTitle>
        <ChildrenNum>{countsInfo.postsCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      active={ROUTE.JOBS === activeThread}
      onClick={logic.onRootMenuSelect.bind(this, ROUTE.COMMUNITIES, ROUTE.JOBS)}
    >
      <ChildrenItemInner>
        <ChildrenTitle>招聘</ChildrenTitle>
        <ChildrenNum>{countsInfo.jobsCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      active={ROUTE.REPOS === activeThread}
      onClick={logic.onRootMenuSelect.bind(
        this,
        ROUTE.COMMUNITIES,
        ROUTE.REPOS
      )}
    >
      <ChildrenItemInner>
        <ChildrenTitle>开源项目</ChildrenTitle>
        <ChildrenNum>{countsInfo.reposCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
    <ChildrenItem
      active={ROUTE.VIDEOS === activeThread}
      onClick={logic.onRootMenuSelect.bind(
        this,
        ROUTE.COMMUNITIES,
        ROUTE.VIDEOS
      )}
    >
      <ChildrenItemInner>
        <ChildrenTitle>视频</ChildrenTitle>
        <ChildrenNum>{countsInfo.videosCount}</ChildrenNum>
      </ChildrenItemInner>
    </ChildrenItem>
  </ChildrenWrapper>
)

const CommunitiesItemBar = ({ active }) => (
  //   <Link href={item.target.href} as={item.target.as}>
  <MenuItemEach>
    <div>
      <MenuRow
        active={active}
        onClick={logic.extendMenuBar.bind(this, ROUTE.COMMUNITIES)}
      >
        <MenuCommunitiesIcon src={`${ICON_CMD}/all.svg`} />
        <div style={{ marginRight: 10 }} />
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <MenuTitle>所有社区</MenuTitle>
      </MenuRow>
    </div>
  </MenuItemEach>
)

const CommunitiesRootMenuItem = ({ activeRaw, activeThread, countsInfo }) => (
  <MenuItemWrapper>
    <CommunitiesItemBar active={activeRaw === ROUTE.COMMUNITIES} />
    <MenuChildren
      activeRaw={activeRaw}
      curRaw={ROUTE.COMMUNITIES}
      activeThread={activeThread}
      countsInfo={countsInfo}
    />
  </MenuItemWrapper>
)

export default CommunitiesRootMenuItem
