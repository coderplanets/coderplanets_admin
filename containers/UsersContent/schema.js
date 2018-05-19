import gql from 'graphql-tag'

const pagedUsers = gql`
  query pagedUsers($filter: PagedUsersFilter!) {
    pagedUsers(filter: $filter) {
      entries {
        id
        nickname
        avatar
        bio
        sex
        email
        company
        qq
        weibo
        weichat
        education
        subscribedCommunitiesCount
        location
        fromGithub
        insertedAt
      }
      pageNumber
      pageSize
      totalCount
      totalPages
    }
  }
`

const schema = {
  pagedUsers,
}

export default schema
