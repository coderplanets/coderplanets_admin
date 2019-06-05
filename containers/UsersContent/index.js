/*
 *
 * UsersContent
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { buildLog, storePlug, ROUTE } from '@utils'
import * as logic from './logic'

import { Wrapper } from './styles'
import IndexContent from './IndexContent'

/* eslint-disable no-unused-vars */
const log = buildLog('C:UsersContent')
/* eslint-enable no-unused-vars */

const renderChildBanner = (route, store, restProps) => {
  const { pagedUsersData } = store

  switch (route.subPath) {
    case ROUTE.SENIOR: {
      return <h3>SENIOR 用户</h3>
    }
    default: {
      return <IndexContent data={pagedUsersData} restProps={restProps} />
    }
  }
}

class UsersContentContainer extends React.Component {
  componentDidMount() {
    const { usersContent } = this.props
    logic.init(usersContent)
  }

  componentWillUnmount() {
    logic.uninit()
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
