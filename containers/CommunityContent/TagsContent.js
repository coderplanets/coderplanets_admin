import React from 'react'
import TagsTable from 'components/TagsTable'

import * as logic from './logic'

/* eslint-disable react/display-name */

const TagsContent = ({ data, restProps: { tagsLoading } }) => (
  <TagsTable
    data={data}
    loading={tagsLoading}
    onDelete={logic.onDelete}
    onEdit={logic.onEdit}
  />
)

export default TagsContent
