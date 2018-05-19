import React from 'react'

import { ICON_ASSETS } from '../../config'
import * as logic from './logic'
import { Tag, Popover } from '../../components'

import {
  BannerContentWrapper,
  Result,
  ResultTop,
  ResultBottom,
  ResultNumber,
  ResultText,
  Operation,
  OperationItem,
  OperationDivider,
  OperationTitle,
  FilterTags,
  OperationIcon,
  OperationIconChart,
} from './styles/common_banner'

class PaysBanner extends React.Component {
  componentWillMount() {
    // logic.loadTags()
  }

  render() {
    // const { totalCount } = this.props
    return (
      <BannerContentWrapper>
        <Result>
          <ResultTop>付费用户总数为 totalCount 条</ResultTop>
          <ResultBottom>
            <ResultText>符合当前条件的帖子</ResultText>
            <ResultNumber>curCount 个</ResultNumber>
            <ResultText>占比 22%</ResultText>
          </ResultBottom>
        </Result>
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
          <OperationItem onClick={logic.onAdd}>
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

export default PaysBanner
