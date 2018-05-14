import React from 'react'
import { inject, observer } from 'mobx-react'

import { storePlug } from '../../utils'

import { ICON_ASSETS } from '../../config'

import * as logic from './logic'
import { Tag } from '../../components'

// TODO: extract banner styles to common components
import {
  BannerContainer,
  BannerContentWrapper,
  Result,
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

class CommunitiesBannerContainer extends React.Component {
  componentWillMount() {
    logic.init(this.props.communitiesBanner)
  }
  render() {
    const { communitiesBanner } = this.props
    const { totalCount } = communitiesBanner
    /* const { detail } = banner */
    return (
      <BannerContainer>
        <BannerContentWrapper>
          <Result>
            {/* <ResultTop>帖子总数为 4837 条</ResultTop> */}
            <ResultBottom>
              <ResultText>社区共</ResultText>
              <ResultNumber>{totalCount}个</ResultNumber>
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
              <OperationIconChart path={`${ICON_ASSETS}/cmd/plus.svg`} />
              添加
            </OperationItem>
            <OperationDivider />
            <OperationItem>
              <OperationIcon path={`${ICON_ASSETS}/cmd/chart.svg`} />
              {/* <OperationIconChart path={`${ICON_ASSETS}/cmd/list.svg`} /> */}
              统计
            </OperationItem>
          </Operation>
        </BannerContentWrapper>
      </BannerContainer>
    )
  }
}

export default inject(storePlug('communitiesBanner'))(
  observer(CommunitiesBannerContainer)
)
