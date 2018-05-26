import gql from 'graphql-tag'

const pagedCommunities = gql`
  query($filter: PagedFilter!) {
    pagedCommunities(filter: $filter) {
      entries {
        id
        title
        desc
        raw
        logo
        subscribersCount
        categories {
          id
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
const pagedCategories = gql`
  query($filter: PagedFilter!) {
    pagedCategories(filter: $filter) {
      entries {
        id
        title
        communities {
          id
          logo
          title
        }
        author {
          id
          nickname
          avatar
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

const pagedTags = gql`
  query($filter: PagedFilter!) {
    pagedTags(filter: $filter) {
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
  query($filter: PagedArticleFilter) {
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
  pagedCommunities,
  pagedTags,
  pagedCategories,
  pagedPosts,
  deleteCommunity,
}

export default schema
