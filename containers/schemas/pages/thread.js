import F from '../fragments'

export const pagedThreads = `
  query($filter: PagedFilter!) {
    pagedThreads(filter: $filter) {
      entries {
        ${F.thread}
      }
      ${F.pagedCounts}
    }
  }
`

export const holder = 1
