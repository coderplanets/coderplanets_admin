import R from 'ramda'
import React from 'react'
import TimeAgo from 'timeago-react'

import {
  AvatarsRow,
  Button,
  SpaceGrow,
  Pagi,
  CommentLoading,
  MarkDownRender,
} from '@components'
import { ICON_CMD } from '@config'
/* import { fakeUsers, getRandomInt, Global, prettyNum } from '@utils' */
import { Global, prettyNum } from '@utils'

import * as logic from './logic'
import CommentsFilter from './CommentsFilter'

import {
  ListsContainer,
  ListTitle,
  TotalHeader,
  TotalCountWrapper,
  TotalNum,
  FloorNum,
  CommentBlock,
  CommentWrapper,
  DeleteOverlay,
  DeleteHintText,
  DeleteBtnGroup,
  CommentUserInfo,
  CommentAvatar,
  CommentHeader,
  CommentUserName,
  TimeStamps,
  CommentContent,
  CommentBodyInfo,
  CommentFooter,
  Actions,
  VisiableAction,
  ReplyIcon,
  ReplyAction,
  CommentHeaderFirst,
  ReplyUsers,
  ReplyTitle,
  ActionNumber,
  UpIcon,
  ReplyBar,
  ReplyToBody,
  ReplyToFloor,
} from './styles/comments_list'

const getSelection = () => {
  const selectText = Global.getSelection().toString()
  if (!R.isEmpty(selectText)) {
    /* console.log('getSelection', selectText) */
    // TODO: then use window.getSelection().getRangeAt(0).getBoundingClientRect() to draw a button
  }
}

const DeleteMask = ({ show }) => (
  <DeleteOverlay show={show}>
    <DeleteHintText>删除后该该评论将不可恢复</DeleteHintText>
    <DeleteBtnGroup>
      <Button size="small" type="red" ghost onClick={logic.cancleDelete}>
        取消
      </Button>
      &nbsp;&nbsp;
      <Button size="small" type="red" onClick={logic.deleteComment}>
        确定删除
      </Button>
    </DeleteBtnGroup>
  </DeleteOverlay>
)

const ActionBottom = ({ data, accountInfo }) => {
  /* console.log('actionBottom data: ', data.author.id) */
  /* console.log('accountInfo --dd -->', accountInfo) */
  if (String(data.author.id) === accountInfo.id) {
    return (
      <div style={{ display: 'flex' }}>
        <ReplyAction>
          <ReplyIcon src={`${ICON_CMD}/edit.svg`} />
          编辑
        </ReplyAction>
        <ReplyAction onClick={logic.onDelete.bind(this, data)}>
          <ReplyIcon src={`${ICON_CMD}/delete.svg`} />
          删除
        </ReplyAction>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex' }}>
      <ReplyAction onClick={logic.openReplyEditor.bind(this, data)}>
        <ReplyIcon src={`${ICON_CMD}/nest_comment.svg`} />
        回复
      </ReplyAction>
    </div>
  )
}

const getAuthors = comment => {
  /* eslint-disable no-return-assign */
  const replies = R.forEach(reply => {
    return (reply.author.extra_id = reply.id)
  }, R.clone(comment.replies))
  /* eslint-enable */

  return R.pluck('author', replies)
}

const Comment = ({ data, tobeDeleteId, accountInfo }) => (
  <CommentBlock>
    <DeleteMask show={data.id === tobeDeleteId} />
    <CommentWrapper tobeDelete={data.id === tobeDeleteId}>
      <CommentUserInfo>
        <CommentAvatar src={data.author.avatar} />
      </CommentUserInfo>

      <CommentBodyInfo onMouseUp={getSelection}>
        <CommentHeader>
          <CommentHeaderFirst>
            <CommentUserName>
              {data.author.nickname}
              <FloorNum>#{data.floor}</FloorNum>
            </CommentUserName>
            {data.repliesCount !== 0 ? (
              <ReplyUsers>
                <ReplyTitle>收到回复:</ReplyTitle>
                <AvatarsRow
                  users={getAuthors(data)}
                  onUserSelect={logic.previewReply}
                  total={data.repliesCount}
                />
              </ReplyUsers>
            ) : null}
          </CommentHeaderFirst>
          <TimeStamps>
            <TimeAgo datetime={data.insertedAt} locale="zh_CN" />
          </TimeStamps>
        </CommentHeader>
        <CommentContent>
          {data.replyTo ? (
            <ReplyBar>
              回复&nbsp;
              {data.replyTo.author.nickname}:
              <ReplyToBody>{data.replyTo.body}</ReplyToBody>
              <ReplyToFloor>#{data.replyTo.floor}</ReplyToFloor>
            </ReplyBar>
          ) : null}
          <MarkDownRender body={data.body} />
        </CommentContent>
        <CommentFooter>
          <Actions>
            <VisiableAction>
              <div onClick={logic.toggleLikeComment.bind(this, data)}>
                <UpIcon
                  src={`${ICON_CMD}/up.svg`}
                  viewerDid={data.viewerHasLiked}
                />
              </div>
              <ActionNumber>{prettyNum(data.likesCount)}</ActionNumber>
            </VisiableAction>
            <VisiableAction>
              <div onClick={logic.toggleDislikeComment.bind(this, data)}>
                <UpIcon
                  src={`${ICON_CMD}/up.svg`}
                  reverse
                  viewerDid={data.viewerHasDisliked}
                />
              </div>
              <ActionNumber>{prettyNum(data.dislikesCount)}</ActionNumber>
            </VisiableAction>
            <SpaceGrow />
            <ActionBottom data={data} accountInfo={accountInfo} />
          </Actions>
        </CommentFooter>
      </CommentBodyInfo>
    </CommentWrapper>
  </CommentBlock>
)

const Lists = ({ entries, tobeDeleteId, accountInfo }) => (
  <React.Fragment>
    {entries.map(c => (
      <div key={c.id}>
        <Comment
          data={c}
          tobeDeleteId={tobeDeleteId}
          accountInfo={accountInfo}
        />
      </div>
    ))}
  </React.Fragment>
)

const TotalCountText = ({ count }) => (
  <TotalCountWrapper>
    {count > 0 ? (
      <ListTitle id="lists-info">
        共收到 <TotalNum>{count}</TotalNum> 条评论:
      </ListTitle>
    ) : null}
  </TotalCountWrapper>
)

const CommentsList = ({
  accountInfo,
  pagedComments: { entries, totalCount, pageSize, pageNumber },
  restProps: { loading, loadingFresh, tobeDeleteId, filterType },
}) => (
  <React.Fragment>
    <TotalHeader>
      <TotalCountText count={totalCount} />
      <CommentsFilter filterType={filterType} show={totalCount >= 2} />
    </TotalHeader>
    {!loadingFresh ? null : (
      <CommentBlock>
        <CommentLoading />
      </CommentBlock>
    )}
    <ListsContainer>
      {loading ? (
        <CommentBlock>
          <CommentLoading />
        </CommentBlock>
      ) : (
        <Lists
          entries={entries}
          accountInfo={accountInfo}
          pageSize={pageSize}
          pageNumber={pageNumber}
          tobeDeleteId={tobeDeleteId}
        />
      )}
    </ListsContainer>
    <Pagi
      left="-10px"
      pageNumber={pageNumber}
      pageSize={pageSize}
      totalCount={totalCount}
      onChange={logic.pageOnChange}
      showBottomMsg
      noMoreMsg="没有更多的评论了"
      emptyMsg="目前还没有评论"
    />
  </React.Fragment>
)

export default CommentsList
