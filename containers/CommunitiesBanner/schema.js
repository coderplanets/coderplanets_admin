import gql from 'graphql-tag'

const communities = gql`
  query communities($filter: PagedFilter!) {
    communities(filter: $filter) {
      totalCount
    }
  }
`
const tags = gql`
  query tags($filter: PagedFilter!) {
    tags(filter: $filter) {
      totalCount
    }
  }
`
const pagedPosts = gql`
  query pagedPosts($filter: PagedFilter!) {
    pagedPosts(filter: $filter) {
      totalCount
    }
  }
`

const schema = {
  communities,
  pagedPosts,
  tags,
}

export default schema
