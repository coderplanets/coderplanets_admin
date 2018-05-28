import styled from 'styled-components'

import { Animate } from '../../../utils'

import { Img } from '../../../components'

export const UnsetText = styled.div`
  color: tomato;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: left;
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
    animation: ${Animate.pulse} 0.3s linear;
  }
`

export const AddWrapper = Wrapper.extend``

export const AddIcon = styled(Img)`
  width: 15px;
  height: 15px;
  display: block;
  fill: lightgrey;
  &:hover {
    cursor: pointer;
    fill: #646479;
  }
  ${AddWrapper}:hover & {
    cursor: pointer;
    fill: #646479;
    animation: ${Animate.pulse} 0.3s linear;
  }
`

export const AddText = styled.div`
  margin-left: 5px;
  color: lightgrey;
  ${AddWrapper}:hover & {
    cursor: pointer;
    color: #646479;
  }
  transition: color 0.2s linear;
`
