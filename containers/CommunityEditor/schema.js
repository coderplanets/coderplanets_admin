import gql from 'graphql-tag'

const createCommunity = gql`
  mutation(
    $title: String!
    $desc: String!
    $logo: String!
    $raw: String!
    $category: String!
  ) {
    createCommunity(
      title: $title
      desc: $desc
      logo: $logo
      raw: $raw
      category: $category
    ) {
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
    $category: String
  ) {
    updateCommunity(
      id: $id
      title: $title
      desc: $desc
      logo: $logo
      raw: $raw
      category: $category
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
