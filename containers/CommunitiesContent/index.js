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
import PostsContent from './PostsContent'
import { Wrapper } from './styles'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunitiesContent')
/* eslint-enable no-unused-vars */

const renderChildContent = (route, store, restProps) => {
  const { pagedCommunitiesData, PagedPostsData } = store
  switch (route.subQuery) {
    case ROUTE.CATEGORIES: {
      return <h2>CATEGORIES Content</h2>
    }
    case ROUTE.EDITORS: {
      return <h2>Editors Content</h2>
    }
    case ROUTE.POSTS: {
      return <PostsContent data={PagedPostsData} restProps={restProps} />
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
    const { route } = communitiesContent
    const restProps = { ...this.props.communitiesContent }

    return (
      <Wrapper>
        {renderChildContent(route, communitiesContent, restProps)}
      </Wrapper>
    )
  }
}

export default inject(storePlug('communitiesContent'))(
  observer(CommunitiesContentContainer)
)
