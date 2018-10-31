import gql from 'graphql-tag'
import { F } from '../schemas'

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
          ${F.author}
        }
        insertedAt
        updatedAt
      }
      ${F.pagedCounts}
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
