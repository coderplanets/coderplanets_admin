/*
 *
 * UsersBanner
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug, ROUTE } from '../../utils'
import * as logic from './logic'

import IndexBanner from './IndexBanner'
import PaysBanner from './PaysBanner'
import PassportsBanner from './PassportsBanner'
import RolesBanner from './RolesBanner'

import { BannerContainer } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:UsersBanner')
/* eslint-enable no-unused-vars */

const renderChildBanner = (route, store) => {
  debug(store)
  switch (route.subQuery) {
    case ROUTE.PAYS: {
      return <PaysBanner />
    }
    case ROUTE.PASSPORTS: {
      return <PassportsBanner />
    }
    case ROUTE.ROLES: {
      return <RolesBanner />
    }
    default: {
      return <IndexBanner />
    }
  }
}

class UsersBannerContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.usersBanner)
  }

  render() {
    const { usersBanner } = this.props
    const { route } = usersBanner

    return (
      <BannerContainer>{renderChildBanner(route, usersBanner)}</BannerContainer>
    )
  }
}

export default inject(storePlug('usersBanner'))(observer(UsersBannerContainer))
