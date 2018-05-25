import gql from 'graphql-tag'

const communitiesRaw = `
  query($filter: PagedFilter!) {
    pagedCommunities(filter: $filter) {
      entries {
        id
        title
        desc
        raw
        logo
        subscribersCount
        insertedAt
        updatedAt
      }
      pageNumber
      pageSize
      totalCount
      totalPages
    }
  }
`
const communities = gql`
  ${communitiesRaw}
`

const schema = {
  communities,
  // Raw suffix is used for SSR
  communitiesRaw,
}

export default schema
