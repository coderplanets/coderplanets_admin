/*
 *
 * UsersBanner
 *
 */

import React from 'react'

import { ROUTE } from '@constant'
import { buildLog, connectStore } from '@utils'

import IndexBanner from './IndexBanner'
import PaysBanner from './PaysBanner'

import { BannerContainer } from './styles'
import { useInit } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:UsersBanner')
/* eslint-enable no-unused-vars */

const renderChildBanner = (curRoute, totalCount, store) => {
  const { filteredCount } = store

  switch (curRoute.subPath) {
    case ROUTE.PAYS: {
      return <PaysBanner totalCount={200} filteredCount={100} />
    }
    default: {
      return (
        <IndexBanner totalCount={totalCount} filteredCount={filteredCount} />
      )
    }
  }
}

const UsersBannerContainer = ({ usersBanner }) => {
  useInit(usersBanner)

  const { curRoute, totalCount } = usersBanner

  return (
    <BannerContainer>
      {renderChildBanner(curRoute, totalCount, usersBanner)}
    </BannerContainer>
  )
}

export default connectStore(UsersBannerContainer)
