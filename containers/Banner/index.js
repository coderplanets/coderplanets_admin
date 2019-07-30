/*
 *
 * Banner
 *
 */

import React from 'react'

import { ROUTE } from '@constant'
import { buildLog, connectStore } from '@utils'

import CommunityBanner from '../CommunityBanner'
import CommunitiesBanner from '../CommunitiesBanner'
import UsersBanner from '../UsersBanner'

import { useInit } from './logic'

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
const BannerContainer = ({ banner }) => {
  useInit(banner)
  const { curRoute } = banner

  return <DomainBanner curRoute={curRoute} />
}

export default connectStore(BannerContainer)
