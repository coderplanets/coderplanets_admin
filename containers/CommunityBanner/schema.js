import gql from 'graphql-tag'

// TODO: put common gql in one place
const pagedPosts = gql`
  query pagedPosts($filter: PagedFilter!) {
    pagedPosts(filter: $filter) {
      totalCount
    }
  }
`
const pagedTags = gql`
  query tags($filter: PagedFilter!) {
    tags(filter: $filter) {
      totalCount
    }
  }
`

const schema = {
  // communities,
  pagedPosts,
  pagedTags,
}

export default schema
