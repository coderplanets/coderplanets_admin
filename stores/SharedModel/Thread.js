import { types as t } from 'mobx-state-tree'
import { PAGE_SIZE } from 'config'

export const Thread = t.model('Thread', {
  id: t.maybeNull(t.string),
  index: t.optional(t.number, 0),
  title: t.optional(t.string, ''),
  raw: t.optional(t.string, ''),
})

export const PagedThreads = t.model('PagedThreads', {
  entries: t.optional(t.array(Thread), []),
  pageNumber: t.optional(t.number, 1),
  pageSize: t.optional(t.number, PAGE_SIZE.D),
  totalCount: t.optional(t.number, 0),
  totalPages: t.optional(t.number, 0),
})
