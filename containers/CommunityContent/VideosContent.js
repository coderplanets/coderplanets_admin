import React from 'react'

import VideosTable from 'components/VideosTable'
import * as logic from './logic'

const VideosContent = ({ data, restProps: { videosLoading } }) => (
  <VideosTable
    data={data}
    loading={videosLoading}
    onDelete={logic.onDelete}
    onEdit={logic.onEdit}
  />
)

export default VideosContent
