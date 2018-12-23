import styled from 'styled-components'

import { Img } from '../../../components'
import { theme } from '../../../utils'

export const Wrapper = styled.div`
  min-height: 800px;
`
export const CommunityIcon = styled(Img)`
  fill: ${theme('banner.title')};
  width: 30px;
  height: 30px;
`
export const OperationWrapper = styled.div`
  display: flex;
  justify-content: center;
`
