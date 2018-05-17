/*
 *
 * CommunityBanner
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug } from '../../utils'
import * as logic from './logic'

import { BannerContainer } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunityBanner')
/* eslint-enable no-unused-vars */

class CommunityBannerContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.communityBanner)
  }

  render() {
    return (
      <BannerContainer>
        <h2>Banner</h2>
        CommunityBanner container!
      </BannerContainer>
    )
  }
}

export default inject(storePlug('communityBanner'))(
  observer(CommunityBannerContainer)
)
