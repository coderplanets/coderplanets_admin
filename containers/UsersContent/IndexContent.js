import React from 'react'
import UsersTable from 'components/UsersTable'

import { loadUsers, cmsPermisstionOnChange } from './logic'

const IndexContent = ({ data, restProps: { usersLoading } }) => (
  <UsersTable
    data={data}
    loading={usersLoading}
    pageOnChange={loadUsers}
    cmsPermisstionOnChange={cmsPermisstionOnChange}
  />
)

export default IndexContent
