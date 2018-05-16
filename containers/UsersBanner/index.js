/*
*
* UsersBanner
*
*/

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug } from '../../utils'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:UsersBanner')
/* eslint-enable no-unused-vars */

class UsersBannerContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.usersBanner)
  }

  render() {
    return <div>UsersBanner container!</div>
  }
}

export default inject(storePlug('usersBanner'))(observer(UsersBannerContainer))
