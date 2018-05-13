import React from 'react'

import { ICON_ASSETS } from '../../config'

// import * as logic from './logic'
import { Tag } from '../../components'

import {
  BannerContainer,
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
} from './styles/community_banner'

/*
   const onChange = e => {
   logic.tabberChange(e)
   }
 */

// const CommunityBanner = ({ content }) => (
const CommunityBanner = () => (
  <BannerContainer>
    <BannerContentWrapper>
      <Result>
        <ResultTop>帖子总数为 4837 条</ResultTop>
        <ResultBottom>
          <ResultText>共找到</ResultText>
          <ResultNumber>87</ResultNumber>
          <ResultText>项结果符合过滤条件</ResultText>
        </ResultBottom>
      </Result>
      <Operation>
        <OperationItem>
          <OperationIcon path={`${ICON_ASSETS}/cmd/filter2.svg`} />
          <OperationTitle>过滤</OperationTitle>
          <FilterTags>
            <Tag closable>最多xx</Tag>
            <Tag closable>最少..</Tag>
          </FilterTags>
        </OperationItem>
        <OperationDivider />
        <OperationItem>
          {/* <OperationIcon path={`${ICON_ASSETS}/cmd/chart.svg`} /> */}
          <OperationIconChart path={`${ICON_ASSETS}/cmd/list.svg`} />
          视图
        </OperationItem>
      </Operation>
    </BannerContentWrapper>
  </BannerContainer>
)

export default CommunityBanner
