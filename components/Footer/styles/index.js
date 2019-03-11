import styled from 'styled-components'
import { cs, theme } from 'utils'

const Link = styled.a`
  text-decoration: none;
  font-weight: bolder;
  color: ${theme('banner.title')};
  transition: color 0.3s;
  &:hover {
    text-decoration: underline;
    color: #5c868b;
  }
`
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const BaseInfo = styled.div`
  display: flex;
  margin-top: 20px;
`
export const BeianInfo = styled.div`
  margin-bottom: 20px;
`

export const Divider = styled.div`
  margin-left: 12px;
  margin-right: 12px;
  color: ${theme('banner.title')};
`

export const GitSource = styled.div`
  margin-top: 2px;
  ${cs.smokey};
`
export const Powerby = styled.div`
  color: ${theme('banner.title')};
`

export const PowerbyLink = styled(Link)``
export const About = styled(Link)``
export const Beian = styled(Link)``
