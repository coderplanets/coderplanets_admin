import gql from 'graphql-tag'
import { F, P } from '../schemas'

const pagedThreads = gql`
  ${P.pagedThreads}
`
const setThread = gql`
  mutation($communityId: ID!, $threadId: ID!) {
    setThread(communityId: $communityId, threadId: $threadId) {
      id
      threads {
        ${F.thread}
      }
    }
  }
`

const schema = {
  pagedThreads,
  setThread,
}

export default schema
