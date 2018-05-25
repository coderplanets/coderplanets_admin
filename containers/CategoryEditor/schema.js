import gql from 'graphql-tag'

const createCategory = gql`
  mutation($title: String!) {
    createCategory(title: $title) {
      id
    }
  }
`

const schema = {
  createCategory,
}

export default schema
