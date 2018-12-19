import styled from 'styled-components'

import Img from '../../Img'
import { animate } from '../../../utils'

export const UnsetText = styled.div`
  color: tomato;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`
export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #e4f7fe;
  border: 1px dashed #97dbfc;
  color: #0692fa;
  padding: 0 10px;
  padding-right: 6px;
  border-radius: 3px;
  margin-right: 7px;
  margin-bottom: 6px;
  &:hover {
    border: 1px solid #97dbfc;
  }
`

export const DeleteCross = styled.div`
  margin-left: 8px;
  &:hover {
    cursor: pointer;
    animation: ${animate.pulseRule};
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
