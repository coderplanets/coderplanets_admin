import React from 'react'

import ThreadsTable from 'components/ThreadsTable'

// import { OperationWrapper } from './styles'
// import * as logic from './logic'

/* eslint-disable react/display-name */
const PostsContent = ({ data, restProps: { threadsLoading } }) => (
  <ThreadsTable
    data={data}
    loading={threadsLoading}
    onDelete={console.log}
    onEdit={console.log}
  />
)

export default PostsContent
