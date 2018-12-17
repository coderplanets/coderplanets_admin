/*
 *
 * UsersContent
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug, ROUTE } from '../../utils'
import * as logic from './logic'

import { Wrapper } from './styles'
import IndexContent from './IndexContent'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:UsersContent')
/* eslint-enable no-unused-vars */

const renderChildBanner = (route, store, restProps) => {
  const { pagedUsersData } = store

  switch (route.subPath) {
    case ROUTE.USERS: {
      return <IndexContent data={pagedUsersData} restProps={restProps} />
    }
    default: {
      return <h2>Index</h2>
    }
  }
}

class UsersContentContainer extends React.Component {
  componentDidMount() {
    const { usersContent } = this.props
    logic.init(usersContent)
  }

  render() {
    const { usersContent } = this.props
    const { route } = usersContent
    const restProps = { ...usersContent }

    return (
      <Wrapper>{renderChildBanner(route, usersContent, restProps)}</Wrapper>
    )
  }
}

export default inject(storePlug('usersContent'))(
  observer(UsersContentContainer)
)
