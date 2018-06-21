/*
 *
 * Banner
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { CommunityBanner, CommunitiesBanner } from '../../containers'
import { makeDebugger, storePlug, ROUTE } from '../../utils'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:Banner')
/* eslint-enable no-unused-vars */

const DomainBanner = ({ curRoute }) => {
  switch (curRoute.mainPath) {
    case ROUTE.COMMUNITIES: {
      return <CommunitiesBanner />
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
  componentWillMount() {
    logic.init(this.props.banner)
  }

  render() {
    const { curRoute } = this.props.banner

    return <DomainBanner curRoute={curRoute} />
  }
}

export default inject(storePlug('banner'))(observer(BannerContainer))
