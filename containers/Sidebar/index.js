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

import { makeDebugger, storeSelector, cutFrom } from '../../utils'

import PinButton from './PinButton'
import { Sidebar } from './styles'

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

const MenuChildren = ({ activeCommunityId, curCommunityId }) => {
  return (
    <ChildrenWrapper
      activeCommunityId={activeCommunityId}
      curCommunityId={curCommunityId}
    >
      <ChildrenItem>
        <ChildrenTitle>post</ChildrenTitle>
        <ChildrenNum>20</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem>
        <ChildrenTitle>job</ChildrenTitle>
        <ChildrenNum>18</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem active>
        <ChildrenTitle>editor</ChildrenTitle>
        <ChildrenNum>3</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem>
        <ChildrenTitle>threads</ChildrenTitle>
        <ChildrenNum>13</ChildrenNum>
      </ChildrenItem>
      <ChildrenItem>
        <ChildrenTitle>subscribes</ChildrenTitle>
        <ChildrenNum>2</ChildrenNum>
      </ChildrenItem>
    </ChildrenWrapper>
  )
}

const MenuList = ({ items, curPath, activeCommunityId }) => {
  /* const sparkData = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0] */
  // const sparkData = [0, 0, 0, 1, 0, 0, 1]

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
      pin,
      subscribedCommunities,
      activeCommunityId,
      // activePart,
    } = sidebar
    //    onMouseLeave={logic.leaveSidebar}
    // onMouseLeave is not unreliable in chrome: https://github.com/facebook/react/issues/4492

    return (
      <Sidebar pin={pin}>
        <PinButton pin={pin} onClick={logic.pin} />
        <br />
        <br />
        <MenuList
          items={subscribedCommunities}
          pin={pin}
          curPath={curPath}
          activeCommunityId={activeCommunityId}
        />
      </Sidebar>
    )
  }
}

export default inject(storeSelector('sidebar'))(observer(SidebarContainer))
