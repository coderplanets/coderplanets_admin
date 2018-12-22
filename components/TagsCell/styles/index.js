import styled from 'styled-components'

import Img from '../../Img'

export const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`
export const AddIcon = styled(Img)`
  width: 15px;
  height: 15px;
  display: block;
  fill: lightgrey;
  &:hover {
    cursor: pointer;
    fill: #646479;
  }
`
