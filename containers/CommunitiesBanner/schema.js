import gql from 'graphql-tag'

const communities = gql`
  query communities($filter: PagedFilter!) {
    communities(filter: $filter) {
      totalCount
    }
  }
`

const schema = {
  communities,
}

export default schema
