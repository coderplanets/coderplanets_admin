import styled from 'styled-components'

import Img from '@components/Img'
import { theme, cs } from '@utils'

export const Wrapper = styled.div`
  ${cs.flex('align-center')};
  height: 70px;
  margin-right: 20px;
`

export const UserAvatar = styled.img`
  ${cs.circle('40px')};
  fill: ${theme('thread.articleTitle')};
  margin-left: 4%;
  opacity: ${theme('avatarOpacity')};
`
export const LeaveResponseText = styled.div`
  font-size: 1.3em;
  margin-left: 15px;
  color: ${theme('comment.placeholder')};
`
export const LeaveResponseUsername = styled.div`
  font-size: 1.3em;
  margin-left: 12px;
  margin-right: 10px;
  color: ${theme('comment.username')};
`
export const ReferToIcon = styled(Img)`
  fill: ${theme('comment.username')};
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-top: 5px;
`

export const ReplyAvatars = styled.div``
