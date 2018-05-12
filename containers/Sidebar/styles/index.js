import styled from 'styled-components'

/* import { darken } from 'polished' */
import { theme } from '../../../utils'

// 纯css，div隐藏滚动条，保留鼠标滚动效果。
// http://blog.csdn.net/liusaint1992/article/details/51277751
export const Sidebar = styled.div`
  position: fixed;
  height: 100vh;
  top: 0;
  width: ${props => (props.pin ? '250px' : '56px')};
  background: ${theme('sidebar.bg')};
  z-index: 1000;
  overflow: hidden;

  transition: width 0.2s, opacity 0.8s, box-shadow 0.1s linear 0.1s,
    background-color 0.3s;

  &:hover {
    width: 250px;
    box-shadow: 3px 0 20px rgba(0, 0, 0, 0.2);
  }
`

export const StyledPin = styled.div`
  color: ${props => (props.pin ? props.theme.sidebar.pin_active : 'grey')};
  visibility: ${props => (props.pin ? 'visible' : 'hidden')};
  opacity: ${props => (props.pin ? 1 : 0)};
  position: absolute;
  font-size: 25px;
  right: 10px;
  top: 5px;
  transition: visibility 0s, opacity 0.3s linear;
  cursor: pointer;

  ${Sidebar}:hover & {
    visibility: visible;
    opacity: 1;
  }
`
