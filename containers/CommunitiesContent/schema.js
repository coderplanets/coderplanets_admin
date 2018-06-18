import gql from 'graphql-tag'

const pagedCommunitiesRaw = `
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

const pagedCommunities = gql`
  ${pagedCommunitiesRaw}
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

const pagedTagsRaw = `
  query($filter: PagedFilter!) {
    pagedTags(filter: $filter) {
      entries {
        id
        title
        color
        thread
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
const pagedTags = gql`
  ${pagedTagsRaw}
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
          logo
          raw
        }
        tags {
          id
          title
          color
          thread
          community {
            id
          }
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
const pagedJobs = gql`
  query pagedJobs($filter: PagedArticleFilter) {
    pagedJobs(filter: $filter) {
      entries {
        id
        title
        company
        companyLogo
        location
        desc
        body
        insertedAt
        updatedAt
        views
        author {
          id
          nickname
          avatar
        }
        communities {
          id
          title
          logo
          raw
        }
        tags {
          id
          title
          color
          thread
          community {
            id
          }
        }
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
const unsetCommunity = gql`
  mutation($thread: CmsThread, $id: ID!, $communityId: ID!) {
    unsetCommunity(thread: $thread, id: $id, communityId: $communityId) {
      id
    }
  }
`
const unsetCategory = gql`
  mutation($categoryId: ID!, $communityId: ID!) {
    unsetCategory(categoryId: $categoryId, communityId: $communityId) {
      id
    }
  }
`
const setTag = gql`
  mutation($thread: String!, $id: ID!, $tagId: ID!, $communityId: ID!) {
    setTag(thread: $thread, id: $id, tagId: $tagId, communityId: $communityId) {
      id
    }
  }
`
const unsetTag = gql`
  mutation($thread: String!, $id: ID!, $tagId: ID!, $communityId: ID!) {
    unsetTag(
      thread: $thread
      id: $id
      tagId: $tagId
      communityId: $communityId
    ) {
      id
    }
  }
`

const deleteTag = gql`
  mutation($id: ID!, $communityId: ID!) {
    deleteTag(id: $id, communityId: $communityId) {
      id
    }
  }
`

const schema = {
  pagedCommunities,
  pagedCommunitiesRaw,
  pagedTags,
  pagedTagsRaw,
  pagedCategories,
  pagedPosts,
  pagedJobs,
  deleteCommunity,
  unsetCategory,
  unsetCommunity,
  setTag,
  unsetTag,
  deleteTag,
}

export default schema
