import gql from 'graphql-tag'
import { P } from '../schemas'

const user = gql`
  ${P.user}
`

const account = gql`
  query account {
    account {
      location
      qq
      weibo
      weichat
      sex
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
    }
  }
`

const schema = {
  account,
  user,
}

export default schema
