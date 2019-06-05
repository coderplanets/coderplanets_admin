/*
 *
 * ArticleViwer
 *
 */

import React from 'react'
import T from 'prop-types'
import { inject, observer } from 'mobx-react'

// import Link from 'next/link'

import { makeDebugger, storePlug } from '@utils'
import PostViewer from './PostViewer'

import * as logic from './logic'

/* eslint-disable no-unused-vars */
const debug = makeDebugger('C:ArticleViwer')
/* eslint-enable no-unused-vars */

const Viwer = ({ type, data, loading, onReaction }) => {
  // debug('Viwer data: ', data)
  switch (type) {
    case 'post': {
      return (
        <PostViewer data={data} loading={loading} onReaction={onReaction} />
      )
    }
    case 'job': {
      return <div>job</div>
    }
    case 'typewriter': {
      return <div>typewriter</div>
    }
    default: {
      return <div>default</div>
    }
  }
}

class ArticleViwerContainer extends React.Component {
  componentDidMount() {
    const { articleViwer } = this.props
    logic.init(articleViwer)
  }

  render() {
    const { type, articleViwer } = this.props
    const { curPost, postLoading } = articleViwer

    return (
      <div>
        <Viwer
          type={type}
          data={curPost}
          loading={postLoading}
          onReaction={logic.onReaction}
        />
      </div>
    )
  }
}

ArticleViwerContainer.propTypes = {
  // https://www.npmjs.com/package/prop-types
  articleViwer: T.object.isRequired,
  type: T.oneOf(['post', 'tut', 'job']),
  // onReaction: T.func.isRequired,
}

ArticleViwerContainer.defaultProps = {
  type: 'post',
}

// ArticleViwerContainer

export default inject(storePlug('articleViwer'))(
  observer(ArticleViwerContainer)
)
