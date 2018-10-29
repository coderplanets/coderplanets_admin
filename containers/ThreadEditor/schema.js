import gql from 'graphql-tag'

const createThread = gql`
  mutation($title: String!, $raw: String!) {
    createThread(title: $title, raw: $raw) {
      title
    }
  }
`

const schema = {
  createThread,
}

export default schema
