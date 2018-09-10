import styled from 'styled-components'

import Img from '../../Img'
import { smokey } from '../../../utils'

export const MatrixWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
`
export const CommunityLogo = styled(Img)`
  width: 25px;
  height: 25px;
  display: block;
  margin-right: 10px;
  margin-bottom: 7px;
  padding-bottom: 3px;
  border-bottom: 2px solid;
  border-bottom-color: ${props => (props.active ? 'grey' : 'white')};
  ${smokey};
  opacity: ${props => (props.len ? 1 : 0.5)};
`
export const GeneralPLogo = CommunityLogo.extend`
  margin-top: 2px;
  width: 22px;
  height: 22px;
`

export const AddOnWrapper = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
`
