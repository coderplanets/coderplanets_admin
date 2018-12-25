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

export const partialTags = `
  query($community: String, $thread: CmsThread, $all: Boolean) {
    partialTags(community: $community all: $all, thread: $thread) {
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
  }
`
