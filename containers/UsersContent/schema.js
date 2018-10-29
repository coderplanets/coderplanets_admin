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
        qq
        weibo
        weichat
        subscribedCommunitiesCount
        location
        fromGithub
        insertedAt
        cmsPassportString
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
