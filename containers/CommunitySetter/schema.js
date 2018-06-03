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
  mutation($part: CmsPart, $id: ID!, $communityId: ID!) {
    setCommunity(part: $part, id: $id, communityId: $communityId) {
      id
    }
  }
`

const schema = {
  pagedCommunities,
  setCommunity,
}

export default schema
