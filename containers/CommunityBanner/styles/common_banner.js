import styled from 'styled-components'

import { Img } from '../../../components'

import { BaseBanner, BaseBannerContent } from './index'

export const BannerContainer = BaseBanner.extend`
  min-height: 100px;
  justify-content: flex-end;
  color: #707084;
`
export const BannerContentWrapper = BaseBannerContent.extend``

export const Operation = styled.div`
  align-self: flex-end;
  display: flex;
`

export const OperationItem = styled.div`
  display: flex;
  color: #9797a9;
  &:hover {
    cursor: pointer;
    font-size: bold;
    color: #e0e0e3;
  }
  transition: color 0.3s linear;
`
// animation: ${Animate.pulse} 0.3s linear;

export const OperationDivider = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  border-left: 1px solid #646479;
  height: 15px;
  align-self: center;
`

export const OperationTitle = styled.div``
export const FilterTags = styled.div`
  margin-left: 8px;
`

export const OperationIcon = styled(Img)`
  fill: #646479;
  width: 16px;
  height: 16px;
  margin-top: 2px;
  margin-right: 3px;
`
export const OperationIconChart = OperationIcon.extend`
  margin-top: 3px;
`
