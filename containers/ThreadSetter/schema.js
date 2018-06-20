import gql from 'graphql-tag'

const pagedThreads = gql`
  query($filter: PagedFilter!) {
    pagedThreads(filter: $filter) {
      entries {
        id
        title
        raw
      }
      totalCount
      totalPages
      pageSize
      pageNumber
    }
  }
`
const setThread = gql`
  mutation($communityId: ID!, $threadId: ID!) {
    setThread(communityId: $communityId, threadId: $threadId) {
      id
      threads {
        title
      }
    }
  }
`

const schema = {
  pagedThreads,
  setThread,
}

export default schema
