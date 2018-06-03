import styled from 'styled-components'

import { Img } from '../../../components'

const SexIcon = styled(Img)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-left: 5px;
  cursor: pointer;
`
export const DudeIcon = SexIcon.extend`
  fill: #869eec;
`

export const GirlIcon = SexIcon.extend`
  fill: pink;
  margin-top: 1px;
`
