import gql from 'graphql-tag'

const createTag = gql`
  mutation(
    $part: CmsPart!
    $title: String!
    $color: String!
    $communityId: ID!
  ) {
    createTag(
      part: $part
      title: $title
      color: $color
      communityId: $communityId
    ) {
      id
      title
    }
  }
`
const schema = {
  createTag,
}

export default schema
