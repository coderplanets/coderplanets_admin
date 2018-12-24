import gql from 'graphql-tag'
import { F, P } from '../schemas'

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
const community = gql`
  ${P.community}
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

const countStatus = gql`
  query {
    countStatus {
      communitiesCount
      postsCount
      jobsCount
      videosCount
      reposCount
      categoriesCount
      tagsCount
      threadsCount
    }
  }
`

const schema = {
  communities,
  community,
  searchCommunities,
  countStatus,
}

export default schema
