import React from 'react'

import ReposTable from 'components/ReposTable'

import * as logic from './logic'

const ReposContent = ({ data, restProps: { reposLoading } }) => (
  <ReposTable
    data={data}
    loading={reposLoading}
    onDelete={logic.onDelete}
    onEdit={logic.onEdit}
    setTag={logic.setTag}
    unsetTag={logic.unsetTag}
    setCommunity={logic.setCommunity}
    unsetCommunity={logic.unsetCommunity}
  />
)

export default ReposContent
