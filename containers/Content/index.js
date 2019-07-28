/*
 *
 * Content
 *
 */

import React from 'react'

import { buildLog, connectStore, ROUTE } from '@utils'

import CommunityContent from '../CommunityContent'
import CommunitiesContent from '../CommunitiesContent'
import UsersContent from '../UsersContent'
// import { CommunityContent, CommunitiesContent } from '.'

import { useInit } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:Content')
/* eslint-enable no-unused-vars */

const DomainContent = ({ curRoute }) => {
  switch (curRoute.mainPath) {
    case ROUTE.COMMUNITIES: {
      return <CommunitiesContent />
    }
    case ROUTE.USERS: {
      return <UsersContent />
    }
    default: {
      return <CommunityContent />
    }
  }
}

/*
   NOTE: this container is only used for dev mode
   for some unkown reasion, pages/index will always be the entry in dev mode
 */
const ContentContainer = ({ content }) => {
  useInit(content)

  const { curRoute } = content

  return <DomainContent curRoute={curRoute} />
}

export default connectStore(ContentContainer)
