import gql from 'graphql-tag'

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
const setCategory = gql`
  mutation($categoryId: ID!, $communityId: ID!) {
    setCategory(categoryId: $categoryId, communityId: $communityId) {
      id
    }
  }
`

const schema = {
  pagedCategories,
  setCategory,
}

export default schema
