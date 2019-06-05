/*
 *
 * Banner
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { buildLog, storePlug, ROUTE } from '@utils'
import CommunityBanner from '../CommunityBanner'
import CommunitiesBanner from '../CommunitiesBanner'
import UsersBanner from '../UsersBanner'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:Banner')
/* eslint-enable no-unused-vars */

const DomainBanner = ({ curRoute }) => {
  switch (curRoute.mainPath) {
    case ROUTE.COMMUNITIES: {
      return <CommunitiesBanner />
    }
    case ROUTE.USERS: {
      return <UsersBanner />
    }
    default: {
      return <CommunityBanner />
    }
  }
}

/*
   NOTE: this container is only used for dev mode
   for some unkown reasion, pages/index will always be the entry in dev mode
 */
class BannerContainer extends React.Component {
  componentDidMount() {
    const { banner } = this.props
    logic.init(banner)
  }

  render() {
    const { banner } = this.props
    const { curRoute } = banner

    return <DomainBanner curRoute={curRoute} />
  }
}

export default inject(storePlug('banner'))(observer(BannerContainer))
