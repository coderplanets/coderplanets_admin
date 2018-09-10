import styled from 'styled-components'

import Img from '../../Img'
import { Animate } from '../../../utils'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CommunityLogo = styled(Img)`
  width: 22px;
  height: 22px;
  display: block;
`

export const Title = styled.div`
  margin-left: 5px;
`
export const SetterWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #e4f7fe;
  border: 1px dashed #97dbfc;
  color: #0692fa;
  padding-right: 6px;
  border-radius: 3px;
  margin-right: 7px;
  &:hover {
    border: 1px solid #97dbfc;
  }
`
export const DeleteCross = styled.div`
  margin-left: 8px;
  &:hover {
    cursor: pointer;
    animation: ${Animate.pulse} 0.3s linear;
  }
`

export const AddIcon = styled(Img)`
  width: 15px;
  height: 15px;
  display: block;
  fill: lightgrey;
  &:hover {
    cursor: pointer;
    fill: #646479;
  }
`
export const UnknowText = styled.div`
  color: lightgrey;
  font-size: 0.8rem;
`
