import styled from 'styled-components'

import { Img } from '@components'

export const CommunityIcon = styled(Img)`
  width: 30px;
  height: 30px;
`
export const Wrapper = styled.div`
  min-height: 800px;
`
export const OperationWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const ColorCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ColorDot = styled.div`
  width: 10px;
  height: 10px;
  background: ${props => props.color};
  border-radius: 100%;
`
export const ColorTitle = styled.div`
  margin-left: 5px;
`
