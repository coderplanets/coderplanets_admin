/*
 *
 * Sidebar
 *
 */

import React from 'react'
// import Link from 'next/link'
import shortid from 'shortid'
import R from 'ramda'
import { inject, observer } from 'mobx-react'

import { makeDebugger, storeSelector, cutFrom, TYPE } from '../../utils'
import { ICON_ASSETS } from '../../config'

import {
  Sidebar,
  Banner,
  Footer,
  BannerLogo,
  BannerTitle,
  SearchLogo,
} from './styles'

import {
  MenuItem,
  MenuRow,
  MenuItemWrapper,
  MenuItemEach,
  MenuItemIcon,
  ChildrenWrapper,
  ChildrenItem,
  ChildrenTitle,
  ChildrenNum,
  SettingIcon,
} from './styles/menu'
import * as logic from './logic'

const debug = makeDebugger('C:Sidebar:index')

const MenuItemBar = ({ item, curPath, activeCommunityId, curCommunityId }) => {
  //   <Link href={item.target.href} as={item.target.as}>
  return (
    <MenuItemEach>
      <div>
        <MenuRow
          active={curPath === R.toLower(item.raw)}
          activeCommunityId={activeCommunityId}
          curCommunityId={curCommunityId}
          onClick={logic.extendMenuBar.bind(this, item)}
        >
          <MenuItemIcon
            active={curPath === R.toLower(item.raw)}
            path={item.logo}
          />
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
        onClick={logic.onChildMenuChange.bind(this, TYPE.C_UTILS)}
        active={TYPE.C_UTILS === activePart}
      >
        <ChildrenTitle>综合设置</ChildrenTitle>
        <ChildrenNum>
          <SettingIcon path={`${ICON_ASSETS}/cmd/extra_setting.svg`} />
        </ChildrenNum>
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
        <ChildrenTitle>标签</ChildrenTitle>
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

const MenuList = ({ items, curPath, activeCommunityId, activePart }) => {
  const listItems = (
    <div>
      {items.map(item => (
        <MenuItemWrapper key={shortid.generate()}>
          <div>
            <MenuItemBar
              curPath={curPath}
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
      ))}
    </div>
  )
  return <MenuItem>{listItems}</MenuItem>
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class SidebarContainer extends React.Component {
  componentDidMount() {
    debug('init')
    logic.init(this.props.sidebar)
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    this.setState({
      items,
    })
  }

  render() {
    const { sidebar } = this.props
    const {
      curPath,
      subscribedCommunities,
      activeCommunityId,
      activePart,
    } = sidebar
    //    onMouseLeave={logic.leaveSidebar}
    // onMouseLeave is not unreliable in chrome: https://github.com/facebook/react/issues/4492

    return (
      <Sidebar>
        <Banner>
          <BannerLogo path={`${ICON_ASSETS}/cmd/rainbow_logo.svg`} />
          <BannerTitle>CPS 管理后台 @2018</BannerTitle>
        </Banner>
        <MenuList
          items={subscribedCommunities}
          curPath={curPath}
          activeCommunityId={activeCommunityId}
          activePart={activePart}
        />
        <Footer>
          <SearchLogo path={`${ICON_ASSETS}/cmd/search2.svg`} />
          <BannerTitle>综合搜索等</BannerTitle>
        </Footer>
      </Sidebar>
    )
  }
}

export default inject(storeSelector('sidebar'))(observer(SidebarContainer))
