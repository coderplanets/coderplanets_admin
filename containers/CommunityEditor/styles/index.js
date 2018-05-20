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

export const Logo = styled(Img)`
  width: 80px;
  height: 80px;
  margin-bottom: 30px;
  &:hover {
    cursor: pointer;
    border: 1px dashed grey;
  }
`

export const ImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border: 1px dashed lightgrey;
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    border: 1px dashed grey;
  }
`

export const Divider = styled.div`
  border-top: 1px solid #e3eeed;
  margin-top: 15px;
  width: 75%;
  margin-bottom: 20px;
`

export const ActionBtns = styled.div``
