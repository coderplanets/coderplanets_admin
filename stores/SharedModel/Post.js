import { types as t } from 'mobx-state-tree'

import { PAGE_SIZE } from '@config'

import { User } from './User'
import { Community } from './Community'
import { Comment } from './Comment'
import { Tag } from './Tag'

export const Post = t.model('Post', {
  id: t.maybeNull(t.string),
  title: t.maybeNull(t.string),
  body: t.maybeNull(t.string),
  digest: t.maybeNull(t.string),
  // author: t.optional(User, {}),
  author: t.maybeNull(User),

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

export const PagedPosts = t.model('PagedPosts', {
  entries: t.optional(t.array(Post), []),
  pageNumber: t.optional(t.number, 1),
  pageSize: t.optional(t.number, PAGE_SIZE.D),
  totalCount: t.optional(t.number, 0),
  totalPages: t.optional(t.number, 0),
})
