import React from 'react'
import { inject, observer } from 'mobx-react'

import { storePlug, makeDebugger, ROUTE } from '../../utils'

import * as logic from './logic'

import IndexBanner from './IndexBanner'
import CategoriesBanner from './CategoryBanner'
import EditorsBanner from './EditorsBanner'
import PostsBanner from './PostsBanner'

// TODO: extract banner styles to common components
import { BannerContainer } from './styles/community_banner'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:CommunitiesBanner')
/* eslint-enable no-unused-vars */

const renderChildBanner = (route, restProps) => {
  switch (route.subQuery) {
    case ROUTE.CATEGORIES: {
      return <CategoriesBanner />
    }
    case ROUTE.EDITORS: {
      return <EditorsBanner />
    }
    case ROUTE.POSTS: {
      return <PostsBanner />
    }
    default: {
      return <IndexBanner restProps={restProps} />
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
    debug('route ccc: ', route)
    const restProps = { ...this.props.communitiesBanner }

    return (
      <BannerContainer>{renderChildBanner(route, restProps)}</BannerContainer>
    )
  }
}

export default inject(storePlug('communitiesBanner'))(
  observer(CommunitiesBannerContainer)
)
