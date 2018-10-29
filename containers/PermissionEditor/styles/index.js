import styled from 'styled-components'

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
export const Divider = styled.div`
  border-top: 1px solid #e3eeed;
  margin-top: 15px;
  width: 75%;
  margin-bottom: 20px;
`
export const ActionBtns = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
`
