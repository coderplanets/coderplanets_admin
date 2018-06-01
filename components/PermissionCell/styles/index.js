import styled from 'styled-components'

import { Animate } from '../../../utils'
import { Img } from '../../../components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 10px;
  color: grey;
  font-size: 0.8rem;
  padding: 5px 10px;
  background: #fff6cf;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
`

export const NumberInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
`

export const Number = styled.span`
  color: yellowgreen;
  padding: 0 5px;
  border-radius: 100%;
  font-size: 0.9rem;
`
export const RootNumber = Number.extend`
  color: orange;
`
export const NoneText = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: lightgrey;
  font-style: italic;
`

export const Label = styled.div`
  flex-grow: 1;
  text-align: left;
`

export const UnitText = styled.div`
  font-size: 0.7rem;
  color: #a7a4a4;
  font-style: italic;
`

export const PermissionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

// TODO: use a component
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
