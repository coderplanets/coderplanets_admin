import gql from 'graphql-tag'

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
        category
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
const tags = gql`
  query tags($filter: PagedFilter!) {
    tags(filter: $filter) {
      entries {
        id
        title
        color
        part
        community {
          id
          logo
          title
        }
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
const pagedPosts = gql`
  query pagedPosts($filter: PagedArticleFilter) {
    pagedPosts(filter: $filter) {
      entries {
        id
        title
        digest
        author {
          id
          nickname
          avatar
        }
        communities {
          id
          title
        }
        commentsCount
        commentsParticipatorsCount
        views
        favoritedCount
        starredCount
        insertedAt
        updatedAt
      }
      totalCount
      pageSize
      pageNumber
    }
  }
`
const deleteCommunity = gql`
  mutation($id: ID!) {
    deleteCommunity(id: $id) {
      id
    }
  }
`

const schema = {
  communities,
  tags,
  pagedPosts,
  deleteCommunity,
}

export default schema
