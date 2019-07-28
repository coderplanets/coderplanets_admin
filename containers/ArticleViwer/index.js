/*
 *
 * ArticleViwer
 *
 */

import React from 'react'
import T from 'prop-types'

import { buildLog, connectStore } from '@utils'
import PostViewer from './PostViewer'

import { useInit, onReaction } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:ArticleViwer')
/* eslint-enable no-unused-vars */

const Viwer = ({ type, data, loading, onReaction }) => {
  // log('Viwer data: ', data)
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

const ArticleViwerContainer = ({ articleViwer, type }) => {
  useInit(articleViwer)

  const { curPost, postLoading } = articleViwer

  return (
    <div>
      <Viwer
        type={type}
        data={curPost}
        loading={postLoading}
        onReaction={onReaction}
      />
    </div>
  )
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

export default connectStore(ArticleViwerContainer)
