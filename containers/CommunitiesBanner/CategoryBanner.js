import React from 'react'

import { BannerCountBrief } from 'components'
import { ICON_CMD } from 'config'

import {
  BannerContentWrapper,
  Operation,
  OperationItem,
  OperationDivider,
  OperationIcon,
  OperationIconChart,
} from './styles/common_banner'

import * as logic from './logic'

class CategoryBanner extends React.Component {
  componentDidMount() {
    logic.loadCategories()
  }

  render() {
    const { filteredCount, totalCount } = this.props
    return (
      <BannerContentWrapper>
        <BannerCountBrief
          filteredCount={filteredCount}
          totalCount={totalCount}
          thread="社区分类"
          unit="个"
        />
        <Operation>
          <OperationItem onClick={logic.onAdd.bind(this, 'categories')}>
            <OperationIconChart src={`${ICON_CMD}/plus.svg`} />
            添加
          </OperationItem>
          <OperationDivider />
          <OperationItem>
            <OperationIcon src={`${ICON_CMD}/chart.svg`} />
            图表
          </OperationItem>
        </Operation>
      </BannerContentWrapper>
    )
  }
}

export default CategoryBanner
