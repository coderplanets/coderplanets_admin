/*
 *
 * CommunitiesContent
 *
 */

import React from 'react'
import { inject, observer } from 'mobx-react'
// import Link from 'next/link'

import { makeDebugger, storePlug, ROUTE } from '../../utils'

import IndexContent from './IndexContent'
import { Wrapper } from './styles'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunitiesContent')
/* eslint-enable no-unused-vars */

const renderChildContent = (route, pagedCommunitiesData, restProps) => {
  switch (route.subQuery) {
    case ROUTE.CATEGORIES: {
      return <h2>CATEGORIES Content</h2>
    }
    case ROUTE.EDITORS: {
      return <h2>Editors Content</h2>
    }
    case ROUTE.POSTS: {
      return <h2>POSTS Content</h2>
    }
    default: {
      return <IndexContent data={pagedCommunitiesData} restProps={restProps} />
    }
  }
}

class CommunitiesContentContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.communitiesContent)
  }

  render() {
    const { communitiesContent } = this.props
    const { pagedCommunitiesData, route } = communitiesContent
    const restProps = { ...this.props.communitiesContent }

    return (
      <Wrapper>
        {renderChildContent(route, pagedCommunitiesData, restProps)}
      </Wrapper>
    )
  }
}

export default inject(storePlug('communitiesContent'))(
  observer(CommunitiesContentContainer)
)
