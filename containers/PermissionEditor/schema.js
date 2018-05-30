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

const schema = {
  pagedCommunities,
  allPassportRulesString,
}

export default schema
