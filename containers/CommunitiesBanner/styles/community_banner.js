import styled from 'styled-components'
import ReactSVG from 'react-svg'
// import { Animate } from '../../../utils'
import { BaseBanner, BaseTabber, BaseBannerContent } from './index'

export const BannerContainer = BaseBanner.extend`
  min-height: 100px;
  justify-content: flex-end;
  color: #707084;
`
export const TabberWrapper = BaseTabber.extend``
export const BannerContentWrapper = BaseBannerContent.extend``

export const Result = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

export const ResultTop = styled.div`
  margin-bottom: 4px;
`
export const ResultBottom = styled.div`
  display: flex;
`

export const ResultNumber = styled.div`
  color: #e0e0e3;
  font-size: 1.1rem;
  margin-left: 10px;
  margin-right: 10px;
`

export const ResultText = styled.div`
  margin-top: 4px;
`

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

export const OperationIcon = styled(ReactSVG)`
  fill: #646479;
  width: 16px;
  height: 16px;
  margin-top: 2px;
  margin-right: 3px;
`
export const OperationIconChart = OperationIcon.extend`
  margin-top: 3px;
`
