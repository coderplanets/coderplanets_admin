/*
 *
 * Banner
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

import { makeDebugger, storeSelector } from '../../utils'

import CommunityBanner from './CommunityBanner'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:Banner')
/* eslint-enable no-unused-vars */

class BannerContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.banner)
  }

  render() {
    const { banner } = this.props
    const { detail } = banner
    // const { mainQuery } = curRoute
    // debug('detail ---> ', detail)

    return <CommunityBanner content={detail.content} />
  }
}

export default inject(storeSelector('banner'))(observer(BannerContainer))
