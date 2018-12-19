import F from '../fragments'

export const pagedTags = `
  query($filter: PagedFilter!) {
    pagedTags(filter: $filter) {
      entries {
        ${F.tag}
        thread
        community {
          id
          logo
          title
        }
        topic {
          title
          raw
        }
        insertedAt
        updatedAt
      }
      ${F.pagedCounts}
    }
  }
`

export const holder = 1
