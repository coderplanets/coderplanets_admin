import styled from 'styled-components'

import { animate } from '@utils'
import Img from '../../Img'

export const UnsetText = styled.div`
  color: tomato;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const CategoryWrapper = styled.div`
  display: flex;
`

export const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  background: #e4f7fe;
  border: 1px dashed #97dbfc;
  color: #0692fa;
  padding: 0 10px;
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
    animation: ${animate.pulse} 0.3s linear;
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
