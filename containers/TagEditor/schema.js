import gql from 'graphql-tag'

const createTag = gql`
  mutation(
    $thread: CmsThread!
    $title: String!
    $color: String!
    $communityId: ID!
  ) {
    createTag(
      thread: $thread
      title: $title
      color: $color
      communityId: $communityId
    ) {
      id
      title
    }
  }
`

const pagedCommunities = gql`
  query($filter: PagedFilter!) {
    pagedCommunities(filter: $filter) {
      entries {
        id
        title
        raw
        logo
      }
      pageNumber
      pageSize
      totalCount
      totalPages
    }
  }
`

const schema = {
  createTag,
  pagedCommunities,
}

export default schema
