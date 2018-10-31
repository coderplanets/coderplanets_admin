import F from '../fragments'

export const pagedCommunities = `
  query($filter: PagedFilter!) {
    pagedCommunities(filter: $filter) {
      entries {
        ${F.community}
        categories {
          ${F.category}
        }
        threads {
          ${F.thread}
        }
      }
      ${F.pagedCounts}
    }
  }
`

export const holder = 1
