import React from 'react'

import { Tag, Popover, BannerCountBrief } from '@components'
import { ICON_CMD } from '@config'

import {
  BannerContentWrapper,
  Operation,
  OperationItem,
  OperationDivider,
  OperationTitle,
  FilterTags,
  OperationIcon,
  OperationIconChart,
} from './styles/common_banner'

import { onSearch, onAdd } from './logic'

const IndexBanner = ({ filteredCount, totalCount }) => (
  <BannerContentWrapper>
    <BannerCountBrief
      filteredCount={filteredCount}
      totalCount={totalCount}
      thread="社区"
      unit="个"
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
        <FilterTags>
          <Tag closable>最多xx</Tag>
        </FilterTags>
      </OperationItem>
      <OperationDivider />
      <OperationItem onClick={onSearch}>
        <OperationIconChart src={`${ICON_CMD}/search2.svg`} />
        搜索
      </OperationItem>
      <OperationDivider />
      <OperationItem onClick={onAdd.bind(this, 'communities')}>
        <OperationIconChart src={`${ICON_CMD}/plus.svg`} />
        添加
      </OperationItem>
      <OperationDivider />
      <OperationItem>
        <OperationIcon src={`${ICON_CMD}/chart.svg`} />
        {/* <OperationIconChart src={`${ICON_CMD}/list.svg`} /> */}
        图表
      </OperationItem>
    </Operation>
  </BannerContentWrapper>
)

export default IndexBanner
