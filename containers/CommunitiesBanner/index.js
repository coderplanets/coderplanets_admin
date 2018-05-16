import React from 'react'
import { inject, observer } from 'mobx-react'

import { storePlug, makeDebugger, ROUTE } from '../../utils'

import * as logic from './logic'

import IndexBanner from './IndexBanner'
import CategoriesBanner from './CategoryBanner'
import EditorsBanner from './EditorsBanner'
import PostsBanner from './PostsBanner'
import TagsBanner from './TagsBanner'

// TODO: extract banner styles to common components
import { BannerContainer } from './styles/community_banner'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunitiesBanner')
/* eslint-enable no-unused-vars */

const renderChildBanner = (route, store) => {
  const {
    totalCount,
    curTotalCount,
    tagsTotalCount,
    postsTotalCount,
    curPostsTotalCount,
  } = store

  switch (route.subQuery) {
    case ROUTE.TAGS: {
      return <TagsBanner totalCount={tagsTotalCount} />
    }
    case ROUTE.CATEGORIES: {
      return <CategoriesBanner />
    }
    case ROUTE.EDITORS: {
      return <EditorsBanner />
    }
    case ROUTE.POSTS: {
      return (
        <PostsBanner
          totalCount={postsTotalCount}
          curCount={curPostsTotalCount}
        />
      )
    }
    default: {
      return <IndexBanner totalCount={totalCount} curCount={curTotalCount} />
    }
  }
}

class CommunitiesBannerContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.communitiesBanner)
  }
  render() {
    const { communitiesBanner } = this.props
    const { route } = communitiesBanner
    /* const { detail } = banner */
    // debug('route ccc: ', route)
    // const restProps = { ...this.props.communitiesBanner }

    return (
      <BannerContainer>
        {renderChildBanner(route, communitiesBanner)}
      </BannerContainer>
    )
  }
}

export default inject(storePlug('communitiesBanner'))(
  observer(CommunitiesBannerContainer)
)
