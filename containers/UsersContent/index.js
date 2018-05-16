/*
*
* UsersContent
*
*/

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug } from '../../utils'
import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:UsersContent')
/* eslint-enable no-unused-vars */

class UsersContentContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.usersContent)
  }

  render() {
    return <div>UsersContent container!</div>
  }
}

export default inject(storePlug('usersContent'))(
  observer(UsersContentContainer)
)
