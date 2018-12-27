import React from 'react'
import UsersTable from '../../components/UsersTable'

import * as logic from './logic'

const IndexContent = ({ data, restProps: { usersLoading } }) => (
  <UsersTable
    data={data}
    loading={usersLoading}
    cmsPermisstionOnChange={logic.cmsPermisstionOnChange}
  />
)

export default IndexContent
