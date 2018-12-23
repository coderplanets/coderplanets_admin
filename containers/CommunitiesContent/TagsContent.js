import React from 'react'

import TagsTable from '../../components/TagsTable'
import * as logic from './logic'

const TagsContent = ({ data, restProps: { tagsLoading } }) => (
  <TagsTable
    data={data}
    loading={tagsLoading}
    onDelete={logic.onDeleteTag}
    onEdit={logic.onEditTag}
  />
)

export default TagsContent
