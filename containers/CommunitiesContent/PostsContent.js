import React from 'react'

import PostsTable from '../../components/PostsTable'

// import { OperationWrapper } from './styles'
import * as logic from './logic'

/* eslint-disable react/display-name */
const PostsContent = ({ data, restProps: { postsLoading } }) => (
  <PostsTable
    data={data}
    loading={postsLoading}
    onDelete={logic.onDelete}
    onEdit={logic.onEdit}
    setTag={logic.setTag}
    unsetTag={logic.unsetTag}
    setCommunity={logic.setCommunity}
    unsetCommunity={logic.unsetCommunity}
  />
)

export default PostsContent
