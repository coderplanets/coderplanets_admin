import React from 'react'
import { inject, observer } from 'mobx-react'

import { storePlug, makeDebugger, ROUTE } from '../../utils'

import * as logic from './logic'

import IndexBanner from './IndexBanner'
import EditorsBanner from './EditorsBanner'
import PostsBanner from './PostsBanner'
import CategoryBanner from './CategoryBanner'
import TagsBanner from './TagsBanner'

import { BannerContainer } from './styles'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunitiesBanner')
/* eslint-enable no-unused-vars */

const renderChildBanner = (route, store) => {
  const {
    // communities
    totalCount,
    filteredTotalCount,
    // tags
    tagsTotalCount,
    filterdTagsCount,
    // posts
    postsTotalCount,
    filteredPostsCount,
    // categories
    categoriesTotalCount,
    filterdCategoriesCount,
  } = store

  switch (route.subQuery) {
    case ROUTE.CATEGORIES: {
      return (
        <CategoryBanner
          totalCount={categoriesTotalCount}
          filteredCount={filterdCategoriesCount}
        />
      )
    }

    case ROUTE.TAGS: {
      return (
        <TagsBanner
          totalCount={tagsTotalCount}
          filteredCount={filterdTagsCount}
        />
      )
    }
    case ROUTE.EDITORS: {
      return <EditorsBanner totalCount={100} filteredCount={10} />
    }
    case ROUTE.POSTS: {
      return (
        <PostsBanner
          totalCount={postsTotalCount}
          filteredCount={filteredPostsCount}
        />
      )
    }
    default: {
      return (
        <IndexBanner
          totalCount={totalCount}
          filteredCount={filteredTotalCount}
        />
      )
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
    /* const restProps = { ...this.props.communitiesBanner } */

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
