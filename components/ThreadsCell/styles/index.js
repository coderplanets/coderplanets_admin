import styled from 'styled-components'

import Img from '../../Img'
import { Animate } from '../../../utils'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`
export const Thread = styled.div`
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 0 5px;
  background: #f1f1f1;
  color: #6cbf6c;
  border-radius: 5px;
  font-size: 0.8rem;
  display: flex;
`
export const DeleteCross = styled.div`
  margin-left: 3px;
  &:hover {
    cursor: pointer;
    animation: ${Animate.pulse} 0.3s linear;
  }
`
export const AddIcon = styled(Img)`
  width: 15px;
  height: 15px;
  display: block;
  margin-top: 2px;
  fill: lightgrey;
  &:hover {
    cursor: pointer;
    fill: #646479;
  }
`
