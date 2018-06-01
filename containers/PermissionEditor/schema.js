import gql from 'graphql-tag'

const pagedCommunities = gql`
  query($filter: PagedFilter!) {
    pagedCommunities(filter: $filter) {
      entries {
        id
        title
        raw
        logo
      }
      pageNumber
      pageSize
      totalCount
      totalPages
    }
  }
`

const allPassportRulesString = gql`
  query {
    allPassportRulesString {
      cms
    }
  }
`

const stampCmsPassport = gql`
  mutation($userId: ID!, $rules: String!) {
    stampCmsPassport(userId: $userId, rules: $rules) {
      id
    }
  }
`

const schema = {
  pagedCommunities,
  allPassportRulesString,
  stampCmsPassport,
}

export default schema
