import styled from 'styled-components'

import { animate } from 'utils'
import Img from '../../Img'

export const AddWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  ${AddWrapper}:hover & {
    cursor: pointer;
    fill: #646479;
    animation: ${animate.pulseRule};
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
//
