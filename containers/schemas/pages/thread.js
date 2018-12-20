import F from '../fragments'

export const pagedThreads = `
  query($filter: PagedFilter!) {
    pagedThreads(filter: $filter) {
      entries {
        id
        title
        raw
      }
      ${F.pagedCounts}
    }
  }
`

export const holder = 1
