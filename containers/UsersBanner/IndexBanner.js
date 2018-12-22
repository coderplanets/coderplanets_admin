import React from 'react'

import { ICON_CMD } from '../../config'
import { Popover, BannerCountBrief } from '../../components'

import {
  BannerContentWrapper,
  Operation,
  OperationItem,
  OperationDivider,
  OperationTitle,
  OperationIcon,
} from './styles/common_banner'

// import * as logic from './logic'

const IndexBanner = ({ filteredCount, totalCount }) => (
  <BannerContentWrapper>
    <BannerCountBrief
      filteredCount={filteredCount}
      totalCount={totalCount}
      thread="用户"
      unit="人"
    />
    <Operation>
      <OperationItem>
        <OperationIcon src={`${ICON_CMD}/filter2.svg`} />
        <Popover
          content={<div>兼容各个页面的 Filter 菜单</div>}
          trigger="hover"
        >
          <OperationTitle>过滤</OperationTitle>
        </Popover>
      </OperationItem>
      <OperationDivider />
      <OperationItem>
        <OperationIcon src={`${ICON_CMD}/chart.svg`} />
        图表
      </OperationItem>
    </Operation>
  </BannerContentWrapper>
)

export default IndexBanner
