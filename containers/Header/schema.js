import gql from 'graphql-tag'
import { F } from '../schemas'

const githubSigninRes = 'githubSignin'
const githubSignin = gql`
  mutation($code: String!) {
    githubSignin(code: $code) {
      token
      user {
        nickname
        bio
      }
    }
  }
`

const sessionState = gql`
  query {
    sessionState {
      isValid
      user {
        id
        geoCity
        nickname
        avatar
        editableCommunities {
          entries {
            ${F.community}
          }
          totalCount
        }
      }
    }
  }
`

const schema = {
  githubSignin,
  githubSigninRes,
  sessionState,
}

export default schema
