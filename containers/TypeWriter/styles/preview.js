import styled from 'styled-components'

// BodyWrapper, BodyHeader, BackToEditBtn, PreviewHeader
import { theme } from 'utils'

export { Wrapper } from './editor'

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`
export const PreviewHeader = styled.div`
  color: ${theme('preview.title')};
  margin-bottom: 15px;
  padding-bottom: 10px;
  text-align: center;
  font-size: 1.5em;
  align-self: center;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('preview.divider')};
  width: 80%;
  min-height: 1.5em;
`

export const BackToEditBtn = styled.div``
