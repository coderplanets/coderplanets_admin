import gql from 'graphql-tag'
import { P } from '../schemas'

const communities = gql`
  query communities($filter: PagedFilter!) {
    communities(filter: $filter) {
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

const pagedCategories = gql`
  ${P.pagedCategories}
`
const pagedTags = gql`
  ${P.pagedTags}
`
const pagedThreads = gql`
  ${P.pagedThreads}
`
const pagedPosts = gql`
  ${P.pagedPosts}
`
const pagedJobs = gql`
  ${P.pagedJobs}
`
const pagedRepos = gql`
  ${P.pagedRepos}
`
const pagedVideos = gql`
  ${P.pagedVideos}
`

const schema = {
  communities,

  pagedTags,
  pagedThreads,
  pagedCategories,
  pagedPosts,
  pagedJobs,
  pagedRepos,
  pagedVideos,
}

export default schema
