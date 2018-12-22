import React from 'react'

import { Pagi, Table, TableLoading } from '../../components'

/* import { OperationWrapper } from './styles' */
import { Trans } from '../../utils'
import * as logic from './logic'

/* eslint-disable react/display-name */
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center',
    width: 80,
  },
  {
    title: '标题',
    width: 300,
    dataIndex: 'title',
    align: 'center',
    render: text => (
      <div>
        {Trans(text)}({text})
      </div>
    ),
  },
  {
    title: 'raw',
    width: 200,
    dataIndex: 'raw',
    align: 'center',
  },
  /*
     {
     title: '操作',
     width: 200,
     dataIndex: '',
     align: 'center',
     render: (text, record) => {
     return (
     <OperationWrapper>
     <Button
     size="small"
     type="primary"
     ghost
     onClick={logic.onEdit.bind(this, record)}
     >
     编辑
     </Button>
     <Space right="10px" />
     <Button
     size="small"
     type="red"
     ghost
     onClick={logic.onDelete.bind(this, record)}
     >
     删除
     </Button>
     </OperationWrapper>
     )
     },
     },
   */
]

const ThreadsContent = ({ data, restProps: { communitiesLoading } }) => (
  <React.Fragment>
    {data ? (
      <div>
        <Table
          columns={columns}
          dataSource={data.entries}
          scroll={{ x: 2000 }}
          loading={TableLoading(communitiesLoading)}
          pagination={false}
        />
        <Pagi
          left="-10px"
          pageNumber={data.pageNumber}
          pageSize={data.pageSize}
          totalCount={data.totalCount}
          onChange={logic.loadJobs}
        />
      </div>
    ) : null}
  </React.Fragment>
)

export default ThreadsContent
