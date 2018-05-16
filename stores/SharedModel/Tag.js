import { types as t } from 'mobx-state-tree'

const Tag = t.model('Tag', {
  id: t.maybe(t.string),
  title: t.maybe(t.string),
  color: t.maybe(t.string),
  logo: t.maybe(t.string),
  part: t.maybe(t.string),
  insertedAt: t.optional(t.string, ''),
  updatedAt: t.optional(t.string, ''),
})

export default Tag
