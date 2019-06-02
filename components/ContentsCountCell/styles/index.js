import styled from 'styled-components'

// import Img from '../../Img'
// import { theme } from '@utils'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const Content = styled.div`
  display: flex;
  align-items: center;
  opacity: ${({ empty }) => (empty ? 0.4 : 1)};
`
export const Label = styled.div`
  font-size: 0.7rem;
  margin-right: 5px;
`
export const Count = styled.div`
  color: ${({ empty }) => (empty ? 'grey' : 'yellowgreen')};
`
