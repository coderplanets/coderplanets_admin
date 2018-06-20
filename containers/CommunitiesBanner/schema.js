import gql from 'graphql-tag'

const pagedCommunities = gql`
  query($filter: PagedFilter!) {
    pagedCommunities(filter: $filter) {
      totalCount
    }
  }
`
const pagedTags = gql`
  query($filter: PagedFilter!) {
    pagedTags(filter: $filter) {
      totalCount
    }
  }
`
const pagedThreads = gql`
  query($filter: PagedFilter!) {
    pagedThreads(filter: $filter) {
      totalCount
    }
  }
`
const pagedCategories = gql`
  query($filter: PagedFilter!) {
    pagedCategories(filter: $filter) {
      totalCount
    }
  }
`
const pagedPosts = gql`
  query($filter: PagedFilter!) {
    pagedPosts(filter: $filter) {
      totalCount
    }
  }
`

const pagedJobs = gql`
  query($filter: PagedFilter!) {
    pagedJobs(filter: $filter) {
      totalCount
    }
  }
`

const schema = {
  pagedCommunities,
  pagedCategories,
  pagedTags,
  pagedThreads,
  pagedPosts,
  pagedJobs,
}

export default schema
