import { types as t } from 'mobx-state-tree'

// NOTE: the SimpleXXX version is to avoid circle import issue which cause MST error

const SimpleCommunity = t.model('SimpleCommunity', {
  id: t.maybe(t.string),
  title: t.maybe(t.string),
  desc: t.optional(t.string, ''),
  raw: t.maybe(t.string),
  logo: t.maybe(t.string),
})

export const SimpleUser = t.model('SimpleUser', {
  id: t.maybe(t.string),
  nickname: t.maybe(t.string),
  bio: t.maybe(t.string),
  avatar: t.maybe(t.string),
})

export const Category = t.model('Category', {
  id: t.maybe(t.string),
  title: t.maybe(t.string),
  communities: t.optional(t.array(SimpleCommunity), []),
  author: t.optional(SimpleUser, {}),
  insertedAt: t.optional(t.string, ''),
  updatedAt: t.optional(t.string, ''),
})

export default Category
