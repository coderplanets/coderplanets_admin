import styled from 'styled-components'

import { Input } from '@components'
import Img from 'components/Img'
import { theme } from '@utils'

export const Wrapper = styled.div`
  display: flex;
`
export const SearchLogo = styled(Img)`
  display: block;
  width: 22px;
  height: 22px;
  fill: #0098b8;
`
export const Inputer = styled(Input)`
  border: none;
  border-bottom: 1px solid;
  border-bottom-color: #005680;
  height: 20px;
  line-height: 20px;
  width: 70%;
  font-size: 1rem;
  margin-left: 10px;
  background: #00384f;
  padding-left: 2px;
  padding-bottom: 8px;
  margin-top: 2px;
  color: ${theme('editor.title')};

  ::placeholder {
    color: ${theme('editor.placeholder')};
  }

  text-align: left;
  &:hover {
    border-color: ${theme('editor.headerBg')};
    border-bottom: 1px solid;
    border-bottom-color: #009de9;
    color: ${theme('editor.title')};
  }
  &:focus {
    border-color: ${theme('editor.headerBg')};
    box-shadow: none;
    border-bottom: 1px solid;
    border-bottom-color: #009de9;
    color: ${theme('editor.title')};
    text-align: left;
  }
`
