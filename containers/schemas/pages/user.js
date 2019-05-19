import F from '../fragments'

export const user = `
  query user($login: String!, $userHasLogin: Boolean!) {
    user(login: $login) {
      ${F.author}
      views
      bio
      sex
      location
      social {
        ${F.userSocial}
      }
      followersCount
      followingsCount
      viewerHasFollowed @include(if: $userHasLogin)
      achievement {
        ${F.achievement}
        sourceContribute {
          web
          server
        }
      }
      workBackgrounds {
        company
        title
      }
      educationBackgrounds {
        school
        major
      }
      fromGithub
      githubProfile {
        htmlUrl
        login
      }
      contributes {
        records {
          count
          date
        }
        startDate
        endDate
        totalCount
      }

      editableCommunities {
        entries {
          ${F.community}
        }
        totalCount
      }
      insertedAt
    }
  }
`

export const pagedUsers = `
  query pagedUsers($filter: PagedUsersFilter!) {
    pagedUsers(filter: $filter) {
      entries {
        id
        nickname
        avatar
        bio
        sex
        email
        social {
          ${F.userSocial}
        }
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

export const sessionState = `
  query {
    sessionState {
      isValid
      user {
        id
        geoCity
        nickname
        avatar
        bio
        fromGithub
        location
        social {
          ${F.userSocial}
        }
        sex
        cmsPassport
        customization {
          ${F.c11n}
        }
        githubProfile {
          htmlUrl
          login
        }
        achievement {
          ${F.achievement}
        }
      }
    }
  }
`
