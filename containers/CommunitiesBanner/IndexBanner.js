import React from 'react'

import { ICON_ASSETS } from '../../config'
import * as logic from './logic'
import { Tag, Popover, BannerCountBrief } from '../../components'

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

class IndexBanner extends React.Component {
  componentWillMount() {
    logic.loadCommunities()
  }
  render() {
    const { filteredCount, totalCount } = this.props
    return (
      <BannerContentWrapper>
        <BannerCountBrief
          filteredCount={filteredCount}
          totalCount={totalCount}
          part="社区"
          unit="个"
        />
        <Operation>
          <OperationItem>
            <OperationIcon src={`${ICON_ASSETS}/cmd/filter2.svg`} />
            <Popover
              content={<div>兼容各个页面的 Filter 菜单</div>}
              trigger="hover"
            >
              <OperationTitle>过滤</OperationTitle>
            </Popover>
            <FilterTags>
              <Tag closable>最多xx</Tag>
              <Tag closable>最少..</Tag>
            </FilterTags>
          </OperationItem>
          <OperationDivider />
          <OperationItem onClick={logic.onAdd.bind(this, 'communities')}>
            <OperationIconChart src={`${ICON_ASSETS}/cmd/plus.svg`} />
            添加
          </OperationItem>
          <OperationDivider />
          <OperationItem>
            <OperationIcon src={`${ICON_ASSETS}/cmd/chart.svg`} />
            {/* <OperationIconChart src={`${ICON_ASSETS}/cmd/list.svg`} /> */}
            统计
          </OperationItem>
        </Operation>
      </BannerContentWrapper>
    )
  }
}

export default IndexBanner
