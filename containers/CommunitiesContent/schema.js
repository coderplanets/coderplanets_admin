import gql from 'graphql-tag'
import { P, F } from '../schemas'

const pagedCommunities = gql`
  ${P.pagedCommunities}
`
const pagedCategories = gql`
  query($filter: PagedFilter!) {
    pagedCategories(filter: $filter) {
      entries {
        id
        title
        raw
        index
        communities {
          id
          logo
          title
        }
        author {
          ${F.author}
        }
        insertedAt
        updatedAt
      }
      ${F.pagedCounts}
    }
  }
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
const unsetThread = gql`
  mutation($communityId: ID!, $threadId: ID!) {
    unsetThread(communityId: $communityId, threadId: $threadId) {
      id
      threads {
        title
      }
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

const deleteCategory = gql`
  mutation($id: ID!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

const schema = {
  pagedCommunities,
  pagedTags,
  pagedThreads,
  pagedCategories,
  pagedPosts,
  pagedJobs,
  unsetThread,
  deleteCommunity,
  unsetCategory,
  unsetCommunity,
  setTag,
  unsetTag,
  deleteTag,
  deleteCategory,
}

export default schema
