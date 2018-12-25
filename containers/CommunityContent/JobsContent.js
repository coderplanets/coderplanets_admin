import React from 'react'

import JobsTable from '../../components/JobsTable'
import * as logic from './logic'

const JobsContent = ({ data, restProps: { jobsLoading } }) => (
  <JobsTable
    data={data}
    loading={jobsLoading}
    onDelete={logic.onDelete}
    onEdit={logic.onEdit}
  />
)

export default JobsContent
