import styled from 'styled-components'

/* import { darken } from 'polished' */
import Img from 'components/Img'
import { theme } from 'utils'

// 纯css，div隐藏滚动条，保留鼠标滚动效果。
// http://blog.csdn.net/liusaint1992/article/details/51277751
export const Sidebar = styled.div`
  position: fixed;
  height: 100%;
  min-height: 100vh;
  top: 0;
  width: 250px;
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

export const Banner = styled.div`
  height: 50px;
  background: #033850;
  display: flex;
  align-items: center;
  color: #6c8892;
  padding-left: 18px;
`

export const Footer = styled(Banner)`
  position: fixed;
  bottom: 0px;
  width: 250px;
`
export const BannerLogo = styled(Img)`
  display: block;
  width: 22px;
  height: 22px;
`
export const BannerTitle = styled.div`
  margin-left: 8px;
  font-size: 0.9rem;
  margin-top: 4px;
`
