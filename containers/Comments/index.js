/*
 *
 * Comments
 *
 */

import React from 'react'
import T from 'prop-types'

import { buildLog, connectStore } from '@utils'

import { Modal } from '@components'
import CommentEditor from './CommentEditor'
import CommentsList from './CommentsList'
import CommentReplyEditor from './CommentReplyEditor'

import { Wrapper } from './styles'

import { useInit, createComment } from './logic'

/* eslint-disable no-unused-vars */
const log = buildLog('C:Comments')
/* eslint-enable no-unused-vars */

const CommentsContainer = ({ comments, ssr, onCreate }) => {
  useInit(comments, ssr)

  const {
    pagedCommentsData,
    referUsersData,
    accountInfo,
    showReplyBox,
    showReplyEditor,
    showReplyPreview,
  } = comments

  return (
    <Wrapper>
      <Modal show={showReplyBox}>
        {/* NOTE: this is used for react-clickouside */}
        {showReplyBox ? (
          <CommentReplyEditor
            accountInfo={accountInfo}
            referUsers={referUsersData}
            restProps={{ ...comments }}
            show={showReplyEditor}
            showReplyPreview={showReplyPreview}
          />
        ) : (
          <div />
        )}
      </Modal>

      <CommentEditor
        onCreate={createComment(onCreate)}
        accountInfo={accountInfo}
        referUsers={referUsersData}
        restProps={{ ...comments }}
      />
      <CommentsList
        accountInfo={accountInfo}
        pagedComments={pagedCommentsData}
        restProps={{ ...comments }}
      />
    </Wrapper>
  )
}

CommentsContainer.propTypes = {
  onCreate: T.func,
  ssr: T.bool,
  comments: T.any.isRequired,
}

CommentsContainer.defaultProps = {
  onCreate: log,
  ssr: false,
}

export default connectStore(CommentsContainer)
