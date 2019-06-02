import styled from 'styled-components'

import { theme } from '@utils'
import Img from '../../Img'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 300px;
`

export const CommunityLogo = styled(Img)`
  fill: ${theme('thread.articleTitle')};
  width: 22px;
  height: 22px;
  margin-bottom: 4px;
  display: block;
  margin-right: 5px;
`
