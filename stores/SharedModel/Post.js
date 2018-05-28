import { types as t } from 'mobx-state-tree'
import { User } from './User'
import Community from './Community'
import Comment from './Comment'
import Tag from './Tag'

const Post = t.model('Post', {
  id: t.maybe(t.string),
  title: t.maybe(t.string),
  body: t.maybe(t.string),
  digest: t.maybe(t.string),
  // author: t.optional(User, {}),
  author: t.maybe(User),

  communities: t.optional(t.array(Community), []),
  tags: t.optional(t.array(Tag), []),
  comments: t.optional(t.array(Comment), []),

  commentsCount: t.optional(t.number, 0),
  commentsParticipatorsCount: t.optional(t.number, 0),
  views: t.optional(t.number, 0),
  favoritedCount: t.optional(t.number, 0),
  starredCount: t.optional(t.number, 0),

  insertedAt: t.optional(t.string, ''),
  updatedAt: t.optional(t.string, ''),
})

export default Post
