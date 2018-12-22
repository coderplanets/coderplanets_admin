import gql from 'graphql-tag'
import { P } from '../schemas'

const pagedUsers = gql`
  ${P.pagedUsers}
`

const schema = {
  pagedUsers,
}

export default schema
