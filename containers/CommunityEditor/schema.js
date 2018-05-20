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

const schema = {
  createCommunity,
}

export default schema
