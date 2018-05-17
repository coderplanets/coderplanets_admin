import styled from 'styled-components'
import ReactSVG from 'react-svg'

// import { darken } from 'polished'
import { theme } from '../../../utils'
import { Sidebar } from './index'

export const MenuItem = styled.ul`
  margin-top: 0px;
  left: 0;
  position: relative;
  width: 260px;
  height: 95vh;
  overflow-y: scroll;
  transition: left 0.2s;
`
/*
   &:hover {
   background: ${props => darken(0.05, props.theme.sidebar.bg)};
   }
 */
export const MenuItemWrapper = styled.li`
  display: block;
`
export const MenuItemEach = styled.div`
  opacity: 1;
  transition: color 0.2s;
  font-size: 15px;
  line-height: 60px;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  color: ${theme('sidebar.menu_link')};
`
export const MenuRow = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 1rem;
  background-color: ${props => (props.active ? '#009DED' : '#005682')};
  padding-left: 15px;

  a {
    color: ${theme('sidebar.menu_link')};
    display: block;
    flex-grow: 1;
    max-width: 50%;
    opacity: 0.6;
  }
  transition: background-color 0.2s linear;
  &:hover {
    background-color: #047fbd;
    a {
      color: ${theme('sidebar.menu_link')};
    }
  }
`

export const MenuTitle = styled.div`
  color: ${theme('sidebar.menu_link')};
  display: block;
  flex-grow: 1;
  max-width: 50%;
  opacity: 0.6;
  margin-top: -10px;

  &:hover {
    color: ${theme('sidebar.menu_link')};
    cursor: pointer;
  }
`

// TODO: hover
export const MiniChartWrapper = styled.div`
  width: 12vh;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  margin-top: -2px;

  display: ${props => (props.pin ? 'flex' : 'none')};
  ${Sidebar}:hover & {
    display: flex;
  }
`

export const MiniChartBar = styled.div`
  height: 8px;
  width: 60px;
  background-color: #285763;
  border-radius: 2px;
`

export const MiniChartText = styled.div`
  position: absolute;
  font-size: 1.1em;
  top: -2px;
  color: #5396a7;
  right: 2px;

  ${MenuRow}:hover & {
    font-weight: bold;
  }
`

export const MenuItemIcon = styled(ReactSVG)`
  opacity: ${props => (props.active ? 1 : 0.5)};
  width: 22px;
  height: 22px;
`
export const MenuCommunitiesIcon = MenuItemIcon.extend`
  fill: ${theme('sidebar.menu_link')};
`

export const ChildrenWrapper = styled.div`
  padding-left: 23px;
  padding-top: ${props => (props.active ? '10px' : '0px')};
  padding-bottom: ${props => (props.active ? '10px' : '0px')};
  border-left: 1px solid #007baa;
  background: #006a9f;
  margin-top: ${props => (props.active ? '10px' : '0px')};
  margin-bottom: ${props => (props.active ? '10px' : '0px')};
  overflow: hidden;
  max-height: ${props => (props.active ? '400px' : '0px')};
  transition: max-height 0.5s ease-in-out;
`
/* display: ${props => */
/* props.activeRaw === props.curCommunityId ? 'block' : 'none'}; */

export const ChildrenItem = styled.div`
  color: ${props => (props.active ? '#A5CFE0' : '#309abb')};
  padding-left: ${props => (props.active ? '11px' : '10px')};
  margin-left: ${props => (props.active ? '-1px' : '0px')};
  border-left: ${props => (props.active ? '3px solid' : '1px solid')};
  border-left-color: ${props => (props.active ? '#A5CFE0' : '#309abb')};
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  transition: color 0.1s linear;
  font-size: ${props => (props.active ? '1rem' : '0.9rem')};
  &:hover {
    cursor: pointer;
    color: #7ebad1;
  }
`

export const ChildrenItemInner = styled.div`
  display: flex;
  width: 100%;
`

export const ChildrenTitle = styled.div`
  flex-grow: 1;
`

export const ChildrenNum = styled.div`
  margin-right: 25px;
`

export const SettingIcon = styled(ReactSVG)`
  fill: #309abb;
  width: 17px;
  height: 17px;
`
