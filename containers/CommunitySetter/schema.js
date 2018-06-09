import gql from 'graphql-tag'

const pagedCommunities = gql`
  query($filter: PagedFilter!) {
    pagedCommunities(filter: $filter) {
      entries {
        id
        title
        logo
      }
      pageNumber
      pageSize
      totalCount
      totalPages
    }
  }
`

const setCommunity = gql`
  mutation($thread: CmsThread, $id: ID!, $communityId: ID!) {
    setCommunity(thread: $thread, id: $id, communityId: $communityId) {
      id
    }
  }
`

const schema = {
  pagedCommunities,
  setCommunity,
}

export default schema
