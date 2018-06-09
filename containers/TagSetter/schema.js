import gql from 'graphql-tag'

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

// TODO: partial_tags ..

const setTag = gql`
  mutation($thread: String!, $id: ID!, $tagId: ID!, $communityId: ID!) {
    setTag(thread: $thread, id: $id, tagId: $tagId, communityId: $communityId) {
      id
    }
  }
`

const schema = {
  pagedTags,
  setTag,
}

export default schema
