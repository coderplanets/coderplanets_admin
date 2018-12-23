import React from 'react'

import VideosTable from '../../components/VideosTable'

import * as logic from './logic'

/* eslint-disable react/display-name */

const VideosContent = ({ data, restProps: { videosLoading } }) => (
  <VideosTable
    data={data}
    loading={videosLoading}
    onDelete={logic.onDelete}
    onEdit={logic.onEdit}
    setTag={logic.setTag}
    unsetTag={logic.unsetTag}
    setCommunity={logic.setCommunity}
    unsetCommunity={logic.unsetCommunity}
  />
)

export default VideosContent
