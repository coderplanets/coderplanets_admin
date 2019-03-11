import React from 'react'

import UsersTable from 'components/UsersTable'
// import * as logic from './logic'

const UsersContent = ({ data, restProps: { usersLoading } }) => (
  <UsersTable data={data} loading={usersLoading} />
)

export default UsersContent
