import gql from 'graphql-tag'

const createCommunity = gql`
  mutation($title: String!, $desc: String!, $logo: String!, $raw: String!) {
    createCommunity(title: $title, desc: $desc, logo: $logo, raw: $raw) {
      id
      title
      desc
    }
  }
`

const updateCommunity = gql`
  mutation(
    $id: ID!
    $title: String
    $desc: String
    $logo: String
    $raw: String
  ) {
    updateCommunity(
      id: $id
      title: $title
      desc: $desc
      logo: $logo
      raw: $raw
    ) {
      id
      title
      desc
    }
  }
`

const schema = {
  createCommunity,
  updateCommunity,
}

export default schema
