import styled from 'styled-components'
import { Img } from '../../../components'

export const UserCellWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.align === 'center' ? 'center' : 'flex-start'};
  margin-left: ${props => props.left};
`
export const Avatar = styled(Img)`
  width: ${props => (props.small ? '18px' : '25px')};
  height: ${props => (props.small ? '18px' : '25px')};
  border-radius: 100%;
`
export const NickName = styled.div`
  margin-left: 5px;
`
