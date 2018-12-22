/*
 *
 * Sidebar
 *
 */
import React from 'react'
import { inject, observer } from 'mobx-react'

import { ICON_CMD } from '../../config'

import MenuList from './MenuList'
import SearchBox from './SearchBox'

import { Sidebar, Banner, Footer, BannerTitle, BannerLogo } from './styles'

import { makeDebugger, storePlug } from '../../utils'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:Sidebar:index')
/* eslint-enable no-unused-vars */

class SidebarContainer extends React.Component {
  componentDidMount() {
    const { sidebar } = this.props
    logic.init(sidebar)
  }

  componentWillUnmount() {
    logic.uninit()
  }

  render() {
    const { sidebar } = this.props
    const {
      subscribedCommunities,
      activeRaw,
      activeThread,
      countsInfo,
      searchValue,
      rootCountStatusData,
    } = sidebar
    //    onMouseLeave={logic.leaveSidebar}
    // onMouseLeave is not unreliable in chrome: https://github.com/facebook/react/issues/4492

    return (
      <Sidebar>
        <Banner>
          <BannerLogo src={`${ICON_CMD}/keyboard_logo.svg`} />
          <BannerTitle onClick={logic.loadCommunities}>
            CPS 管理后台 @2018
          </BannerTitle>
        </Banner>
        <MenuList
          items={subscribedCommunities}
          activeRaw={activeRaw}
          rootCountStatusData={rootCountStatusData}
          countsInfo={countsInfo}
          activeThread={activeThread}
        />
        <Footer>
          <SearchBox value={searchValue} />
        </Footer>
      </Sidebar>
    )
  }
}

export default inject(storePlug('sidebar'))(observer(SidebarContainer))
