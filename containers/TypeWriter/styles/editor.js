import styled from 'styled-components'

import { Input } from '@components'
import { theme } from '@utils'

export const Wrapper = styled.div`
  padding: 20px;
  background-color: ${theme('editor.contentBg')};
  min-height: 600px;
  margin-top: 5px;
  margin-left: 4%;
  margin-right: 4%;
  border-radius: 5px;
  flex-direction: column;
  display: flex;
`
export const TitleInput = styled(Input)`
  border-color: ${theme('editor.border')};
  border-bottom: 1px solid;
  border-bottom-color: ${theme('editor.borderNormal')};
  ::placeholder {
    color: ${theme('editor.placeholder')};
  }

  text-align: center;
  height: 45px;
  font-size: 1.6em;
  color: ${theme('editor.title')};
  background: ${theme('editor.headerBg')};
  align-self: center;
  width: 85%;
  &:hover {
    border-color: ${theme('editor.border')};
    border-bottom: 1px solid;
    border-bottom-color: ${theme('editor.borderActive')};
  }
  &:focus {
    border-color: ${theme('editor.border')};
    box-shadow: none;
    border-bottom: 1px solid;
    border-bottom-color: ${theme('editor.borderActive')};
  }
`
export const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
`
