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
        }
        tags {
          id
          title
          color
          part
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
const deleteCommunity = gql`
  mutation($id: ID!) {
    deleteCommunity(id: $id) {
      id
    }
  }
`
const unsetCommunity = gql`
  mutation($part: CmsPart, $id: ID!, $communityId: ID!) {
    unsetCommunity(part: $part, id: $id, communityId: $communityId) {
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
  mutation($part: String!, $id: ID!, $tagId: ID!, $communityId: ID!) {
    setTag(part: $part, id: $id, tagId: $tagId, communityId: $communityId) {
      id
    }
  }
`
const unsetTag = gql`
  mutation($part: String!, $id: ID!, $tagId: ID!, $communityId: ID!) {
    unsetTag(part: $part, id: $id, tagId: $tagId, communityId: $communityId) {
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
  deleteCommunity,
  unsetCategory,
  unsetCommunity,
  setTag,
  unsetTag,
}

export default schema
