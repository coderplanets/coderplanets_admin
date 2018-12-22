import styled from 'styled-components'

// import Img from '../../Img'
import { animate } from '../../../utils'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const ColorDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: red;
  margin-right: 6px;
  background: ${({ bg }) => bg || 'wheat'};
`

export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #e4f7fe;
  border: 1px dashed #97dbfc;
  color: #0692fa;
  padding-right: 10px;
  padding-left: 4px;
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
