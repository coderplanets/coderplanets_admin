import styled from 'styled-components'

import { theme } from '@utils'
import Img from '../../Img'

export const Wrapper = styled.div`
  flex-grow: 1;
`
export const InnerBtnWrapper = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`

export const FilterIcon = styled(Img)`
  fill: ${theme('font')};
  width: 16px;
  height: 16px;
  margin-top: 2px;
  margin-left: 3px;
`

export const SelectPanelWrapper = styled.div`
  width: 280px;
  margin-left: 20px;
`

export const SelectTitle = styled.div`
  border-bottom: 1px solid #eaeaea;
  font-weight: bold;
  width: 80%;
  padding-bottom: 5px;
  margin-bottom: 10px;

  color: ${theme('font')};
`

export const SelectItem = styled.div`
  margin-bottom: 10px;
  color: ${props =>
    props.active === props.item ? theme('font', props) : 'grey'};
  &:hover {
    cursor: pointer;
    color: ${theme('font')};
  }
`
