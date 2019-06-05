/*
 *
 * UsersBanner
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { buildLog, storePlug, ROUTE } from '@utils'
import * as logic from './logic'

import IndexBanner from './IndexBanner'
import PaysBanner from './PaysBanner'

import { BannerContainer } from './styles'

/* eslint-disable no-unused-vars */
const debug = buildLog('C:UsersBanner')
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

class UsersBannerContainer extends React.Component {
  componentDidMount() {
    const { usersBanner } = this.props
    logic.init(usersBanner)
  }

  render() {
    const { usersBanner } = this.props
    const { curRoute, totalCount } = usersBanner

    return (
      <BannerContainer>
        {renderChildBanner(curRoute, totalCount, usersBanner)}
      </BannerContainer>
    )
  }
}

export default inject(storePlug('usersBanner'))(observer(UsersBannerContainer))
