/*
 *
 * Banner
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

import { makeDebugger, storePlug } from '../../utils'

import IndexBanner from './IndexBanner'

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

    return <IndexBanner content={detail.content} />
  }
}

export default inject(storePlug('banner'))(observer(BannerContainer))
