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

const schema = {
  communities,
  pagedPosts,
}

export default schema
