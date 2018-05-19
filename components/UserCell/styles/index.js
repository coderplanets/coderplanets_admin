import styled from 'styled-components'
import { Img } from '../../../components'

export const UserCellWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
`
export const Avatar = styled(Img)`
  width: 25px;
  height: 25px;
  border-radius: 100%;
`
export const NickName = styled.div`
  margin-left: 5px;
`
