import gql from 'graphql-tag'
import { P, F } from '../schemas'

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

const communitySubscribers = gql`
  query($id: ID!, $filter: PagedFilter!) {
    communitySubscribers(id: $id, filter: $filter) {
      entries {
        ${F.user}
      }
      ${F.pagedCounts}
    }
  }
`

const pagedCategories = gql`
  ${P.pagedCategories}
`
const partialTags = gql`
  ${P.partialTags}
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

  partialTags,
  pagedThreads,
  pagedCategories,
  pagedPosts,
  pagedJobs,
  pagedRepos,
  pagedVideos,
  communitySubscribers,
}

export default schema
