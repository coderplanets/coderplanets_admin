import gql from 'graphql-tag'

const pagedUsers = gql`
  query pagedUsers($filter: PagedUsersFilter!) {
    pagedUsers(filter: $filter) {
      totalCount
    }
  }
`

const schema = {
  pagedUsers,
}

export default schema
