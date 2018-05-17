/*
*
* CommunityContent
*
*/

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug } from '../../utils'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunityContent')
/* eslint-enable no-unused-vars */

class CommunityContentContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.communityContent)
  }

  render() {
    return <div>CommunityContent container!</div>
  }
}

export default inject(storePlug('communityContent'))(
  observer(CommunityContentContainer)
)
