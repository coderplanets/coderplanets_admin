import React from 'react'

import ThreadsTable from 'components/ThreadsTable'

// import * as logic from './logic'

const ReposContent = ({ data, restProps: { threadsLoading } }) => (
  <ThreadsTable
    data={data}
    loading={threadsLoading}
    onDelete={console.log}
    onEdit={console.log}
  />
)

export default ReposContent
