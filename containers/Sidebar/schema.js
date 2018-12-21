import gql from 'graphql-tag'
import { F } from '../schemas'

const communities = gql`
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

const searchCommunities = gql`
  query($title: String!) {
    searchCommunities(title: $title) {
      entries {
        ${F.community}
      }
      totalCount
    }
  }
`

const schema = {
  communities,
  searchCommunities,
}

export default schema
