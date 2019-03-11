import styled from 'styled-components'

import { Img } from 'components'
import { animate, theme } from 'utils'
//
export const Wrapper = styled.div`
  display: flex;
`

export const Item = styled.div`
  display: flex;
  color: ${theme('editor.footer')};
  &:hover {
    color: #51abb2;
    animation: ${animate.pulseRule};
  }
`

export const Divider = styled(Img)`
  fill: #75898a;
  width: 10px;
  height: 10px;
  margin-left: 4px;
  margin-right: 4px;
`
export const ItemTitle = styled.div`
  cursor: pointer;
  font-size: 1rem;
  ${Item}:hover & {
    color: ${theme('editor.footerHover')};
  }
`
export const ItemIcon = styled(Img)`
  fill: ${theme('editor.content')};
  width: 17px;
  height: 17px;
  margin-right: 3px;
  margin-top: 2px;

  ${Item}:hover & {
    fill: ${theme('editor.footerHover')};
  }
`
