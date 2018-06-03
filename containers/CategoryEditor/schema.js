import gql from 'graphql-tag'

const createCategory = gql`
  mutation($title: String!) {
    createCategory(title: $title) {
      id
    }
  }
`
const updateCategory = gql`
  mutation($id: ID!, $title: String!) {
    updateCategory(id: $id, title: $title) {
      id
    }
  }
`

const schema = {
  createCategory,
  updateCategory,
}

export default schema
