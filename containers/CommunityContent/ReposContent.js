import React from 'react'

import ReposTable from 'components/ReposTable'

// import { OperationWrapper } from './styles'
import * as logic from './logic'

/* eslint-disable react/display-name */
const ReposContent = ({ data, restProps: { reposLoading } }) => (
  <ReposTable
    data={data}
    loading={reposLoading}
    onDelete={logic.onDelete}
    onEdit={logic.onEdit}
  />
)

export default ReposContent
