import { types as t } from 'mobx-state-tree'
import { PAGE_SIZE } from '../../config'

export const Thread = t.model('Thread', {
  id: t.maybe(t.string),
  title: t.maybe(t.string),
  raw: t.maybe(t.string),
})

export const PagedThreads = t.model('PagedThreads', {
  entries: t.optional(t.array(Thread), []),
  pageNumber: t.optional(t.number, 1),
  pageSize: t.optional(t.number, PAGE_SIZE.COMMON),
  totalCount: t.optional(t.number, 0),
  totalPages: t.optional(t.number, 0),
})
