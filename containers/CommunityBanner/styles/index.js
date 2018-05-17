import styled from 'styled-components'
// import ReactSVG from 'react-svg'

import { theme } from '../../../utils'

export const BaseBanner = styled.div`
  position: relative;
  min-height: 140px;
  border-bottom: 1px solid tomato;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${theme('banner.bg')};
  border-bottom: ${theme('banner.spliter')};
  @media (max-height: 800px) {
    min-height: 130px;
  }
`

export const BaseBannerContent = styled.div`
  display: flex;
  margin-left: 30px;
  margin-right: 25px;
  padding-bottom: 10px;
`

export const BannerContainer = BaseBanner.extend`
  min-height: 100px;
  justify-content: flex-end;
  color: #707084;
`
