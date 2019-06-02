import styled from 'styled-components'

// import Img from '../../Img'
// import { theme } from '@utils'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Content = styled.div`
  display: flex;
  align-items: center;
`

export const Label = styled.div`
  font-size: 0.7rem;
  margin-right: 5px;
`
export const Count = styled.div`
  color: ${({ same }) => (same ? 'grey' : 'yellowgreen')};
  font-size: 0.8rem;
`
