import gql from 'graphql-tag'

// TODO: remove
const pagedTags = gql`
  query($filter: PagedFilter!) {
    pagedTags(filter: $filter) {
      entries {
        id
        title
        color
        thread
        community {
          id
          title
          logo
        }
      }
      pageNumber
      pageSize
      totalCount
      totalPages
    }
  }
`

const partialTags = gql`
  query($communityId: ID!, $thread: CmsThread!) {
    partialTags(communityId: $communityId, thread: $thread) {
      id
      title
      color
      thread
      community {
        id
        title
        logo
        raw
      }
    }
  }
`

const setTag = gql`
  mutation($thread: String!, $id: ID!, $tagId: ID!, $communityId: ID!) {
    setTag(thread: $thread, id: $id, tagId: $tagId, communityId: $communityId) {
      id
    }
  }
`

const schema = {
  pagedTags,
  partialTags,
  setTag,
}

export default schema
