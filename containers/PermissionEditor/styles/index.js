import styled from 'styled-components'

import { Img } from '../../../components'
import { Animate } from '../../../utils'

export const Wrapper = styled.div`
  background: #ffffff;
  padding-top: 20px;
  padding-bottom: 50px;
  height: 100%;
  min-height: 80vh;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  background: #f9fcfc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  animation: ${Animate.fadeInRight} 0.2s linear;
`

export const PermissionWrapper = styled.div`
  width: 100%;
  background: #f1f1f1;
  border-radius: 5px;
  min-height: 300px;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
`
export const PerItem = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  padding-right: 5px;
  padding-left: 5px;
  border: 1px solid #e8e6e6;
  &:hover {
    background-color: #eaeaea;
    cursor: pointer;
  }
  transition: background 0.2s linear;
`
export const PerTitle = styled.div`
  flex-grow: 1;
`

export const CheckIcon = styled(Img)`
  width: 16px;
  height: 16px;
  fill: ${props => (props.active ? 'yellowgreen' : 'lightgrey')};
`

export const Divider = styled.div`
  border-top: 1px solid #e3eeed;
  margin-top: 15px;
  width: 75%;
  margin-bottom: 20px;
`

export const ActionBtns = styled.div``
